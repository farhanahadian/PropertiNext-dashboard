import { OpenStreetMapProvider, RequestType } from "leaflet-geosearch";
const PROVIDER = new OpenStreetMapProvider({
  params: {
    "accept-language": "id",
    countrycodes: "id"
  }
});

function GeoSearch() {
  return {
    provider: PROVIDER,
    search(query) {
      return this.provider.search({ query: query });
    },
    async reverse(lat, lng) {
      // return this.provider.search({ query: {lat: lat, lon: lng}, type: 1 })
      const url = this.provider.endpoint({query: {lat: lat, lon: lng}, type: 1});

      const request = await fetch(url);
      const json = await request.json();
      return this.provider.parse({ data: json });
    }
  };
}

export default GeoSearch;
