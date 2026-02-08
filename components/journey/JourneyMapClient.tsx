'use client'

import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { JourneyLegProgress, JourneyProgress } from '@/types/goals'
import { computeCurrentPosition } from '@/utils/journeyMap'

// Fix default Leaflet marker icons when bundling with Next.js.
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = defaultIcon

type JourneyMapClientProps = {
  progress: JourneyProgress | null
  selectedLeg?: JourneyLegProgress | null
}

type MapFocusProps = {
  selectedLeg: JourneyLegProgress | null
  currentPosition: { lat: number; lng: number } | null
}

function MapFocus({ selectedLeg, currentPosition }: MapFocusProps) {
  const map = useMap()

  useEffect(() => {
    if (selectedLeg) {
      const bounds = L.latLngBounds(
        [selectedLeg.goal.startLat, selectedLeg.goal.startLng],
        [selectedLeg.goal.endLat, selectedLeg.goal.endLng]
      )
      map.fitBounds(bounds, { padding: [40, 40] })
      return
    }

    if (currentPosition) {
      map.setView([currentPosition.lat, currentPosition.lng], 8)
    }
  }, [map, selectedLeg, currentPosition])

  return null
}

export default function JourneyMapClient({ progress, selectedLeg = null }: JourneyMapClientProps) {
  const legs = useMemo(() => progress?.legs ?? [], [progress?.legs])

  const routePositions = useMemo(() => {
    if (!legs.length) return []

    return legs.reduce<[number, number][]>((acc, leg, index) => {
      if (index === 0) {
        acc.push([leg.goal.startLat, leg.goal.startLng])
      }
      acc.push([leg.goal.endLat, leg.goal.endLng])
      return acc
    }, [])
  }, [legs])

  const currentPosition = useMemo(() => {
    if (!progress) return null

    const interpolated = computeCurrentPosition(progress.currentLeg, progress.progressPercent)
    if (interpolated) return interpolated

    const lastLeg = legs[legs.length - 1]
    if (lastLeg) {
      return { lat: lastLeg.goal.endLat, lng: lastLeg.goal.endLng }
    }

    return null
  }, [legs, progress])

  if (!legs.length) {
    return (
      <section className="w-full rounded-2xl bg-white p-5 shadow-md border border-slate-200">
        <p className="text-sm text-slate-600">No route data to display on the map yet.</p>
      </section>
    )
  }

  const center: [number, number] = currentPosition
    ? [currentPosition.lat, currentPosition.lng]
    : routePositions[0] ?? [0, 0]

  const selectedStart: [number, number] | null = selectedLeg
    ? [selectedLeg.goal.startLat, selectedLeg.goal.startLng]
    : null
  const selectedEnd: [number, number] | null = selectedLeg
    ? [selectedLeg.goal.endLat, selectedLeg.goal.endLng]
    : null

  return (
    <section className="w-full h-full rounded-2xl bg-white p-3 shadow-md border border-slate-200">
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={false}
        className="h-72 w-full rounded-xl sm:h-80 lg:h-full"
      >
        <MapFocus selectedLeg={selectedLeg} currentPosition={currentPosition} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {routePositions.length > 1 && (
          <Polyline positions={routePositions} pathOptions={{ color: '#0F52BA', weight: 4 }} />
        )}
        {selectedStart && <Marker position={selectedStart} />}
        {selectedEnd && <Marker position={selectedEnd} />}
        {currentPosition && (
          <Marker position={[currentPosition.lat, currentPosition.lng]} />
        )}
      </MapContainer>
    </section>
  )
}
