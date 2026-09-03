import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon paths in bundler environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom colored SVG pin factory
function createCustomPin(type, isRecommended = false) {
  let color = "#17212b";
  if (type === "SCA") color = "#0d6efd"; // Blue for SCA
  if (type === "PSB") color = "#138808"; // Green for Bank
  if (type === "RRB") color = "#ff9933"; // Saffron for RRB
  if (type === "NBFC-MFI") color = "#6f42c1"; // Purple for MFI

  const svgHtml = `
    <div style="position: relative; width: 34px; height: 42px;">
      <svg viewBox="0 0 24 32" width="34" height="42" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));">
        <path d="M12 0 C5.37 0 0 5.37 0 12 C0 21 12 32 12 32 C12 32 24 21 24 12 C24 5.37 18.63 0 12 0 Z" fill="${color}" stroke="${isRecommended ? '#ffc107' : '#ffffff'}" stroke-width="${isRecommended ? 2.5 : 1.5}"/>
        <circle cx="12" cy="11" r="5" fill="#ffffff" />
      </svg>
      ${
        isRecommended
          ? '<div style="position: absolute; top: -6px; right: -6px; background: #ff9933; color: #fff; font-size: 9px; font-weight: bold; border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border: 1.5px solid #fff;">★</div>'
          : ""
      }
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: "custom-map-marker-pin",
    iconSize: [34, 42],
    iconAnchor: [17, 42],
    popupAnchor: [0, -38],
  });
}

export function PartnerMap({
  partners = [],
  selectedPartner = null,
  onSelectPartner,
  recommendedPartnerId = null,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map if not already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [23.5937, 78.9629], // Center of India
        zoom: 5,
        scrollWheelZoom: false,
      });

      // OpenStreetMap standard tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    // Add markers for provided partners
    const bounds = [];
    partners.forEach((partner) => {
      if (!partner.coordinates || partner.coordinates.length !== 2) return;

      const isRec = partner.id === recommendedPartnerId;
      const marker = L.marker(partner.coordinates, {
        icon: createCustomPin(partner.type, isRec),
      }).addTo(map);

      const popupContent = `
        <div style="font-family: 'Inter', sans-serif; min-width: 220px; padding: 4px;">
          ${
            isRec
              ? '<span style="display:inline-block; background:#138808; color:#fff; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; margin-bottom:4px;">★ SMART ROUTED CHOICE</span>'
              : ""
          }
          <div style="font-size: 11px; font-weight: 700; color: #6b747c;">${partner.fullTypeName}</div>
          <strong style="font-size: 13px; color: #17212b; display: block; margin: 2px 0 6px;">${partner.name}</strong>
          <div style="font-size: 11px; color: #444; margin-bottom: 6px;">📍 ${partner.address}</div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; border-top: 1px solid #eee; padding-top: 6px;">
            <span>Fund Quota:</span>
            <strong style="color: ${partner.fundAvailabilityScore >= 80 ? '#138808' : '#d97706'}">${partner.fundAvailabilityScore}%</strong>
          </div>
          <button id="btn-select-${partner.id}" style="margin-top: 8px; width: 100%; background: #17212b; color: #fff; border: 0; padding: 6px; border-radius: 4px; font-size: 11px; font-weight: 600; cursor: pointer;">
            View Partner & Apply
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on("popupopen", () => {
        const btn = document.getElementById(`btn-select-${partner.id}`);
        if (btn) {
          btn.onclick = () => onSelectPartner(partner);
        }
      });

      markersRef.current.push(marker);
      bounds.push(partner.coordinates);
    });

    // Fit map bounds to show all markers
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }

    return () => {
      // Map cleanup on unmount
    };
  }, [partners, recommendedPartnerId]);

  // If a specific partner is selected, pan to it
  useEffect(() => {
    if (selectedPartner && mapInstanceRef.current && selectedPartner.coordinates) {
      mapInstanceRef.current.setView(selectedPartner.coordinates, 12, {
        animate: true,
      });
    }
  }, [selectedPartner]);

  return (
    <div className="leaflet-map-wrapper">
      <div ref={mapContainerRef} className="map-canvas-container" style={{ height: "460px", width: "100%", borderRadius: "10px" }} />
      <div className="map-legend-bar">
        <span className="legend-title">Partner Types:</span>
        <span className="legend-chip"><span className="legend-dot" style={{ background: "#0d6efd" }}></span> SCA (State Agency)</span>
        <span className="legend-chip"><span className="legend-dot" style={{ background: "#138808" }}></span> PSB (Public Bank)</span>
        <span className="legend-chip"><span className="legend-dot" style={{ background: "#ff9933" }}></span> RRB (Rural Bank)</span>
        <span className="legend-chip"><span className="legend-dot" style={{ background: "#6f42c1" }}></span> NBFC-MFI</span>
      </div>
    </div>
  );
}
