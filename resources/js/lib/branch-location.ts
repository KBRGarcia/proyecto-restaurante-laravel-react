export const DEFAULT_MAP_CENTER: [number, number] = [10.4806, -66.9036];
export const DEFAULT_MAP_ZOOM = 12;
export const COORDINATE_PRECISION = 8;

export const parseCoordinate = (value: unknown): number | null => {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const parsed = typeof value === "number" ? value : Number(value);

    return Number.isFinite(parsed) ? parsed : null;
};

export const isValidLatitude = (latitude: number): boolean => latitude >= -90 && latitude <= 90;

export const isValidLongitude = (longitude: number): boolean => longitude >= -180 && longitude <= 180;

export const hasValidCoordinates = (
    latitude: number | null,
    longitude: number | null,
): boolean => {
    return (
        latitude !== null &&
        longitude !== null &&
        isValidLatitude(latitude) &&
        isValidLongitude(longitude)
    );
};

export const getValidCoordinates = (
    latitude: number | null,
    longitude: number | null,
): { latitude: number; longitude: number } | null => {
    if (!hasValidCoordinates(latitude, longitude)) {
        return null;
    }

    return { latitude: latitude as number, longitude: longitude as number };
};

export const formatCoordinate = (value: number | null | undefined): string => {
    if (value === null || value === undefined) {
        return "N/A";
    }

    return Number(value).toFixed(COORDINATE_PRECISION);
};

export const normalizeCoordinate = (value: number): number =>
    Number(value.toFixed(COORDINATE_PRECISION));

export const buildGoogleMapsUrl = (latitude: unknown, longitude: unknown): string | null => {
    const parsedLatitude = parseCoordinate(latitude);
    const parsedLongitude = parseCoordinate(longitude);
    const coordinates = getValidCoordinates(parsedLatitude, parsedLongitude);

    if (!coordinates) {
        return null;
    }

    return `https://www.google.com/maps/place/${coordinates.latitude},${coordinates.longitude}`;
};
