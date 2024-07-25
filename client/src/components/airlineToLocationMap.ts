export interface Location {
  lat: number;
  lng: number;
}

export const airlineToLocationMap: { [key: string]: Location } = {
  'Volaris': { lat: 19.4361, lng: -99.0719 }, // Mexico City, Mexico
  'Air China': { lat: 40.0801, lng: 116.5846 }, // Beijing, China
  'Philippine Airlines': { lat: 14.5086, lng: 121.0194 }, // Manila, Philippines
  'China Airlines': { lat: 25.0777, lng: 121.2328 }, // Taoyuan, Taiwan
  'Air India': { lat: 28.5562, lng: 77.1000 }, // New Delhi, India
  'TAP Air Portugal': { lat: 38.7756, lng: -9.1355 }, // Lisbon, Portugal
  'Finnair': { lat: 60.3172, lng: 24.9633 }, // Helsinki, Finland
  'Iberia': { lat: 40.4936, lng: -3.5668 }, // Madrid, Spain
  'Southwest Airlines': { lat: 32.8471, lng: -96.8518 }, // Dallas, USA
  'WestJet': { lat: 51.1215, lng: -114.0106 }, // Calgary, Canada
  'Delta Air Lines': { lat: 33.6407, lng: -84.4277 }, // Atlanta, USA
  'Qantas': { lat: -33.9461, lng: 151.1772 }, // Sydney, Australia
  'JetBlue Airways': { lat: 40.6413, lng: -73.7781 }, // New York City, USA
  'Hawaiian Airlines': { lat: 21.3245, lng: -157.9242 }, // Honolulu, USA
  'Saudia': { lat: 21.6940, lng: 39.1362 }, // Jeddah, Saudi Arabia
  'Avianca': { lat: 4.7016, lng: -74.1469 }, // Bogotá, Colombia
  'British Airways': { lat: 51.4700, lng: -0.4543 }, // London, UK
  'Cathay Pacific': { lat: 22.3080, lng: 113.9185 }, // Hong Kong
  'El Al': { lat: 32.0003, lng: 34.8700 }, // Tel Aviv, Israel
  'Etihad Airways': { lat: 24.4539, lng: 54.3773 }, // Abu Dhabi, UAE
  'Alaska Airlines': { lat: 47.4502, lng: -122.3088 }, // Seattle, USA
  'Thai Airways': { lat: 13.9126, lng: 100.6076 }, // Bangkok, Thailand
  'Lufthansa': { lat: 50.1109, lng: 8.6821 }, // Frankfurt, Germany
  'Virgin Atlantic': { lat: 51.1481, lng: -0.1903 }, // Crawley, UK
  'Frontier Airlines': { lat: 39.8617, lng: -104.6737 }, // Denver, USA
  'EVA Air': { lat: 25.0786, lng: 121.2329 }, // Taoyuan, Taiwan
  'Asiana Airlines': { lat: 37.4602, lng: 126.4407 }, // Seoul, South Korea
  'Singapore Airlines': { lat: 1.3644, lng: 103.9915 }, // Singapore
  'Norwegian Air Shuttle': { lat: 60.1939, lng: 11.1004 }, // Oslo, Norway
  'Spirit Airlines': { lat: 26.0726, lng: -80.1528 }, // Fort Lauderdale, USA
  'American Airlines': { lat: 32.8968, lng: -97.0370 }, // Dallas/Fort Worth, USA
  'Scandinavian Airlines': { lat: 59.6519, lng: 17.9186 }, // Stockholm, Sweden
  'Fiji Airways': { lat: -17.7554, lng: 177.4428 }, // Nadi, Fiji
  'Emirates': { lat: 25.2532, lng: 55.3657 }, // Dubai, UAE
  'Copa Airlines': { lat: 9.0714, lng: -79.3835 }, // Panama City, Panama
  'Air New Zealand': { lat: -37.0082, lng: 174.7850 }, // Auckland, New Zealand
  'Korean Air': { lat: 37.4602, lng: 126.4407 }, // Seoul, South Korea
  'Alitalia': { lat: 41.7999, lng: 12.2462 }, // Rome, Italy
  'Turkish Airlines': { lat: 41.2753, lng: 28.7519 }, // Istanbul, Turkey
  'Allegiant Air': { lat: 36.0840, lng: -115.1537 }, // Las Vegas, USA
  'Aeromexico': { lat: 19.4361, lng: -99.0719 }, // Mexico City, Mexico
  'Qatar Airways': { lat: 25.2731, lng: 51.6088 }, // Doha, Qatar
  'Air France': { lat: 49.0097, lng: 2.5479 }, // Paris, France
  'Swiss International Air Lines': { lat: 47.4506, lng: 8.5617 }, // Zurich, Switzerland
  'United Airlines': { lat: 41.9742, lng: -87.9073 }, // Chicago, USA
  'Japan Airlines': { lat: 35.5494, lng: 139.7798 }, // Tokyo, Japan
  'LATAM Airlines': { lat: -33.3927, lng: -70.7854 }, // Santiago, Chile
  'Aeroflot': { lat: 55.9726, lng: 37.4146 }, // Moscow, Russia
  'Air Canada': { lat: 43.6777, lng: -79.6248 } // Toronto, Canada
};

export const airlineToContinentMap: { [key: string]: string } = {
  'Volaris': 'northAmerica',
  'Air China': 'asia',
  'Philippine Airlines': 'asia',
  'China Airlines': 'asia',
  'Air India': 'asia',
  'TAP Air Portugal': 'europe',
  'Finnair': 'europe',
  'Iberia': 'europe',
  'Southwest Airlines': 'northAmerica',
  'WestJet': 'northAmerica',
  'Delta Air Lines': 'northAmerica',
  'Qantas': 'australia',
  'JetBlue Airways': 'northAmerica',
  'Hawaiian Airlines': 'northAmerica',
  'Saudia': 'asia',
  'Avianca': 'southAmerica',
  'British Airways': 'europe',
  'Cathay Pacific': 'asia',
  'El Al': 'asia',
  'Etihad Airways': 'asia',
  'Alaska Airlines': 'northAmerica',
  'Thai Airways': 'asia',
  'Lufthansa': 'europe',
  'Virgin Atlantic': 'europe',
  'Frontier Airlines': 'northAmerica',
  'EVA Air': 'asia',
  'Asiana Airlines': 'asia',
  'Singapore Airlines': 'asia',
  'Norwegian Air Shuttle': 'europe',
  'Spirit Airlines': 'northAmerica',
  'American Airlines': 'northAmerica',
  'Scandinavian Airlines': 'europe',
  'Fiji Airways': 'australia',
  'Emirates': 'asia',
  'Copa Airlines': 'southAmerica',
  'Air New Zealand': 'australia',
  'Korean Air': 'asia',
  'Alitalia': 'europe',
  'Turkish Airlines': 'asia',
  'Allegiant Air': 'northAmerica',
  'Aeromexico': 'northAmerica',
  'Qatar Airways': 'asia',
  'Air France': 'europe',
  'Swiss International Air Lines': 'europe',
  'United Airlines': 'northAmerica',
  'Japan Airlines': 'asia',
  'LATAM Airlines': 'southAmerica',
  'Aeroflot': 'europe',
  'Air Canada': 'northAmerica'
};
