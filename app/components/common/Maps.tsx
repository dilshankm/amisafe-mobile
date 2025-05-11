/**
 * Maps component displays a Google Map with crime markers and an optional radius circle.
 *
 * @component
 * @param {MapsProps} props - The props for the Maps component.
 * @param {number} props.lat - The latitude for the initial map region and circle center.
 * @param {number} props.lng - The longitude for the initial map region and circle center.
 * @param {CrimeMarker[]} [props.markers] - Optional array of crime markers to display on the map.
 * @param {string} [props.radius] - Optional radius (in miles) to draw a circle around the center point.
 *
 * @returns {JSX.Element} The rendered Maps component with interactive markers and a bottom sheet for crime details.
 *
 * @remarks
 * - Uses `react-native-maps` for map rendering and marker management.
 * - Automatically fits the map view to show all markers when available.
 * - Displays a custom bottom sheet with crime details when a marker is pressed.
 * - Optionally draws a circle with the given radius (converted from miles to meters) around the center.
 */
import React, { useRef, useState, useEffect, useCallback } from "react";
import { ImageSourcePropType, View } from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Circle,
  LatLng,
} from "react-native-maps";
import CustomBottomSheet, {
  BottomSheetHandles,
  CrimeInfo,
} from "./CustomeBottomSheet";
import { icons } from "@/constants/icons";
import { assignColorsToCrimeMarkers } from "@/utils/crimeUtil";

export interface CrimeMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  location: string;
  pinColor?: string;
  outcomeStatus: string;
  date: string;
  image: ImageSourcePropType;
  category: string;
}

interface MapsProps {
  lat: number;
  lng: number;
  markers?: CrimeMarker[];
  radius?: string;
}

const Maps: React.FC<MapsProps> = ({ lat, lng, markers = [], radius }) => {
  const coloredMarkers = assignColorsToCrimeMarkers(markers);
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheetHandles>(null);
  const [selectedCrime, setSelectedCrime] = useState<CrimeInfo | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const handleMapReady = useCallback(() => {
    setIsMapReady(true);
  }, []);

  // Automatically fit the map to show all markers when available
  useEffect(() => {
    if (!isMapReady || markers.length === 0) return;
    const coordinates: LatLng[] = markers.map((m) => ({
      latitude: m.latitude,
      longitude: m.longitude,
    }));
    setTimeout(() => {
      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, bottom: 100, left: 100, right: 100 },
        animated: true,
      });
    }, 300);
  }, [markers, isMapReady]);

  // Show the bottom sheet when a marker is pressed
  const handleMarkerPress = (crime: CrimeMarker) => {
    const crimeInfo: CrimeInfo = {
      type: crime.title,
      location: crime.location,
      date: crime.date,
      icon: icons.settings,
      status: crime.outcomeStatus,
      image: crime.image,
      category: crime.category,
    };
    setSelectedCrime(crimeInfo);
  };

  return (
    <View className="flex-1 w-full h-full">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        onMapReady={handleMapReady}
        zoomEnabled
        scrollEnabled
        showsUserLocation
        showsMyLocationButton
        showsCompass
        showsPointsOfInterest
        zoomControlEnabled
        mapType="standard"
      >
        {coloredMarkers.map((crime) => (
          <Marker
            key={crime.id}
            identifier={crime.id}
            pinColor={crime.pinColor}
            title={crime.title}
            coordinate={{
              latitude: crime.latitude,
              longitude: crime.longitude,
            }}
            onPress={() => handleMarkerPress(crime)}
            tracksViewChanges={true}
          />
        ))}
        {coloredMarkers.length > 0 && (
          <Circle
            center={{ latitude: lat, longitude: lng }}
            radius={Number(radius) * 1609.34}
            strokeColor="red"
            fillColor="rgba(255, 0, 0, 0.3)"
          />
        )}
      </MapView>
      <CustomBottomSheet ref={bottomSheetRef} crime={selectedCrime} />
    </View>
  );
};

export default React.memo(Maps);
