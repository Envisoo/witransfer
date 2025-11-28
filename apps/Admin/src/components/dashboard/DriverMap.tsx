/** @format */

"use client";

import React, { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const drivers = [
  {
    id: 1,
    name: "Carlos Silva",
    lat: -8.839988,
    lng: 13.289437,
    status: "active",
  },
  { id: 2, name: "Ana Pereira", lat: -8.85, lng: 13.25, status: "active" },
  { id: 3, name: "João Neto", lat: -8.82, lng: 13.3, status: "busy" },
  { id: 4, name: "Maria Costa", lat: -8.86, lng: 13.27, status: "active" },
];

const statusColors: Record<string, { fill: string; stroke: string }> = {
  active: { fill: "#0ea5e9", stroke: "#075985" }, // sky
  busy: { fill: "#f97316", stroke: "#9a3412" }, // orange
  offline: { fill: "#9ca3af", stroke: "#4b5563" }, // gray
};

const FitBounds: React.FC<{ points: [number, number][] }> = ({ points }) => {
  const map = useMap();
  useMemo(() => {
    if (!points.length) return;
    const bounds = L.latLngBounds(
      points.map(([lat, lng]) => L.latLng(lat, lng))
    );
    map.fitBounds(bounds, { padding: [20, 20], maxZoom: 14 });
  }, [map, points]);
  return null;
};

const DriverMap = () => {
  const points = useMemo(
    () => drivers.map((d) => [d.lat, d.lng] as [number, number]),
    []
  );
  return (
    <div className="h-full w-full rounded-lg overflow-hidden z-0 relative">
      <MapContainer
        center={[-8.839988, 13.289437]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors, &copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds points={points} />
        {drivers.map((driver) => {
          const colors = statusColors[driver.status] || statusColors.offline;
          return (
            <CircleMarker
              key={driver.id}
              center={[driver.lat, driver.lng]}
              radius={10}
              pathOptions={{
                color: colors.stroke,
                weight: 2,
                fillColor: colors.fill,
                fillOpacity: 0.9,
              }}>
              <Tooltip
                direction="top"
                offset={[0, -8]}
                opacity={1}
                permanent={false}
                className="!bg-white !text-gray-700 !rounded-md !px-2 !py-1 !shadow">
                {driver.name}
              </Tooltip>
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{driver.name}</p>
                  <p
                    className={
                      driver.status === "active"
                        ? "text-sky-600"
                        : driver.status === "busy"
                          ? "text-orange-600"
                          : "text-gray-600"
                    }>
                    {driver.status === "active"
                      ? "Disponível"
                      : driver.status === "busy"
                        ? "Em viagem"
                        : "Offline"}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur rounded-md shadow px-2 py-1 text-xs text-gray-700 flex items-center gap-3 border border-gray-200">
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-500 border border-sky-800"></span>
          Disponível
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500 border border-orange-800"></span>
          Em viagem
        </span>
      </div>
    </div>
  );
};

export default DriverMap;
