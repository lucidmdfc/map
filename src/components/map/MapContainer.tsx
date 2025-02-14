import { useEffect, useState } from "react";
// leaflet
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON as GeoJSONType } from "geojson";

// controlls
import ResetButtonControl from "../controlls/ResetButtonControl";
// layers
import { GeoJSONLayer, MarkerLayer } from "../Layers";
// Data
import country from "../../dataMocks/country.json";
import province from "../../dataMocks/MoroccoProvinces.json";
import communes from "../../dataMocks/MoroccoCommunes.json";
// utils
import FitBoundsToGeoJSON from "../../utils/fitBound";
import { MapSettings } from ".";
import { Box } from "@mui/material";
import { LegendWithFilters } from "../LegendWithFilters";
import { useMapRegistry } from "@/src/hooks/useMapRegistry";
import { sanityFetch } from "@/src/lib/client";
import {
  CATEGORY_QUERY,
  ESTABLISHMENT_QUERY,
  POPULATION_SEGMENTS_QUERY,
  TIME_SEGMENT_QUERY,
} from "@/src/lib/queries";

const CustomMapContainer: React.FC = () => {
  const [countryData, setCountryData] = useState<GeoJSONType | null>(
    country as GeoJSONType
  );
  const [establishment, setEstablishment] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortingByMethode, setSortingByMethode] = useState<{
    property: string;
    type: "category" | "gradient";
    items: any[];
  } | null>(null);
  const [sortingMethods, setSortingMethods] = useState<
    { property: string; type: "category" | "gradient"; items: any[] }[]
  >([]);
  const [cityClicked, setCityClicked] = useState(false);
  const [timeSegment, setTimeSegment] = useState([]);
  const [legendType, setLegendType] = useState<"category" | "gradient">(
    "category"
  );
  const { state, updateMarkers, updateLegend, refresh } = useMapRegistry();
  // const fetchAndUpdateData = async () => {
  //   const data = await sanityFetch({
  //     query: ESTABLISHMENT_QUERY,
  //     params: {
  //       categoryId: "",
  //       selectedYear: "",
  //       selectedQuarter: "",
  //       selectedMonth: "",
  //       adminAreaName: "",
  //     },
  //   });
  //   const category = await sanityFetch({ query: CATEGORY_QUERY });
  //   const population = await sanityFetch({
  //     query: POPULATION_SEGMENTS_QUERY,
  //   });
  //   const time = await sanityFetch({
  //     query: TIME_SEGMENT_QUERY,
  //   });
  //   setTimeSegment(time);
  //   setSortingMethods(population);
  //   setSortingByMethode(population[0]);
  //   setEstablishment(data);
  //   setCategories(category);

  //   // Prepare markers and legend
  //   const markers = data.map((establishment: any) => ({
  //     id: establishment._id,
  //     coordinates: establishment.location,
  //     type: establishment.properties.type,
  //     metadata: {
  //       title: establishment.name,
  //       ...establishment.properties,
  //     },
  //   }));

  //   const legend = {
  //     title: "Prison Statistics",
  //     type: "legend",
  //     items:
  //       sortingByMethode?.items?.map((legendItem, index) => ({
  //         type: sortingByMethode?.type,
  //         id: `${sortingByMethode?.property}-${index}`,
  //         label: legendItem?.label,
  //         NumericRanges:
  //           legendItem.NumericRanges?.length === 2
  //             ? (legendItem.NumericRanges as [number, number])
  //             : legendItem.NumericRanges?.[0],
  //       })) || [],
  //   };

  //   // Update state
  //   await updateMarkers(markers);
  //   await updateLegend(legend);
  //   await refresh();
  // };

  // useEffect(() => {
  //   fetchAndUpdateData();
  // }, [state]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await sanityFetch({
        query: ESTABLISHMENT_QUERY,
        params: {
          categoryId: "",
          selectedYear: "",
          selectedQuarter: "",
          selectedMonth: "",
          adminAreaName: "",
        },
      });
      const category = await sanityFetch({ query: CATEGORY_QUERY });
      const population = await sanityFetch({
        query: POPULATION_SEGMENTS_QUERY,
      });
      const time = await sanityFetch({
        query: TIME_SEGMENT_QUERY,
      });
      setTimeSegment(time);
      setSortingMethods(population);
      setSortingByMethode(population[0]);
      setEstablishment(data);
      setCategories(category);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sendDataAndFetchUpdatedState = async () => {
      // const markers = establishment.map((establishment: any) => ({
      //   id: establishment._id,
      //   coordinates: establishment.location,
      //   type: establishment.properties.type,
      //   metadata: {
      //     title: establishment.name,
      //     ...establishment.properties,
      //   },
      // }));
      const legend = {
        title: "Prison Statistics",
        type: "legend",
        items:
          sortingByMethode?.items?.map((legendItem, index) => ({
            type: sortingByMethode?.type,
            id: `${sortingByMethode?.property}-${index}`,
            label: legendItem?.label,
            NumericRanges:
              legendItem.NumericRanges?.length === 2
                ? (legendItem.NumericRanges as [number, number])
                : legendItem.NumericRanges?.[0],
          })) || [],
      };
      // console.log(legend);
      // await updateMarkers(markers);
      await updateLegend(legend);
      await refresh();
    };
    sendDataAndFetchUpdatedState();
  }, [
    updateMarkers,
    updateLegend,
    refresh,
    establishment,
    categories,
    sortingMethods,
  ]);
  // console.log(state);

  const handleCityClick = async (feature: any) => {
    const provinceCode = feature?.properties?.id?.slice(2);
    const provinceData = province.features.filter((prov: any) => {
      const codeProvince = prov?.properties?.Code_Province;
      if (codeProvince) {
        return codeProvince.split(".")[0] === provinceCode;
      }
      return false;
    });

    if (provinceData.length > 0) {
      setCountryData(provinceData as unknown as GeoJSONType);
    }

    const data = await sanityFetch({
      query: ESTABLISHMENT_QUERY,
      params: {
        categoryId: "",
        selectedYear: "",
        selectedQuarter: "",
        selectedMonth: "",
        adminAreaName: "",
      },
    });

    console.log("data :", data);
    console.log("feature :", feature.properties.name);

    const markers = await data.map((establishment: any) => ({
      id: establishment._id,
      coordinates: establishment.location,
      type: establishment.properties.type,
      metadata: {
        title: establishment.name,
        ...establishment.properties,
      },
    }));
    // console.log(establishment);
    // const cityData: GeoJSONType = {
    //   type: "FeatureCollection",
    //   features: [feature],
    // };
    // setCountryData(cityData as GeoJSONType);

    await updateMarkers(markers);
    await refresh();

    setCityClicked(true);
  };

  const handleReset = async () => {
    setCountryData(country as GeoJSONType);
    setEstablishment([]);
    setCityClicked(false);
  };
  const onSortingByChange = (e: any) => {
    const selectedMethod = sortingMethods.find(
      (method) => method.property === e
    );
    if (selectedMethod) {
      setSortingByMethode(selectedMethod);
      setLegendType(selectedMethod?.type as "category" | "gradient");
    }
  };

  const onCategoryChange = async (category: any) => {
    const filteredEstablishments = await sanityFetch({
      query: ESTABLISHMENT_QUERY,
      params: {
        categoryId: category,
        selectedYear: "",
        selectedQuarter: "",
        selectedMonth: "",
        adminAreaName: "",
      },
    });
    const markers = await filteredEstablishments.map((establishment: any) => ({
      id: establishment._id,
      coordinates: establishment.location,
      type: establishment.properties.type,
      metadata: {
        title: establishment.name,
        ...establishment.properties,
      },
    }));
    await updateMarkers(markers);
    await refresh();

    // setEstablishment(filteredEstablishments);
  };

  const onTimeSegmentChange = async (
    selectedYear: number | string,
    selectedMonth: string,
    selectedQuarter: string
  ) => {
    const filteredEstablishments = await sanityFetch({
      query: ESTABLISHMENT_QUERY,
      params: {
        categoryId: "",
        adminAreaName: "",
        selectedYear,
        selectedQuarter,
        selectedMonth,
      },
    });
    const markers = await filteredEstablishments.map((establishment: any) => ({
      id: establishment._id,
      coordinates: establishment.location,
      type: establishment.properties.type,
      metadata: {
        title: establishment.name,
        ...establishment.properties,
      },
    }));
    await updateMarkers(markers);
    await refresh();
    // setEstablishment(establishments);
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <LeafletMapContainer
        style={{
          height: "100%",
          width: "60%",
        }}
        {...MapSettings}
      >
        {/* <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          /> */}

        {/* Automatically fit the map to countryData */}
        {countryData && <FitBoundsToGeoJSON geojsonData={countryData} />}

        {/* Layers (choropleth + marker) */}
        {countryData && (
          <GeoJSONLayer
            key={JSON.stringify(countryData)}
            data={countryData}
            onCityClick={handleCityClick}
          />
        )}
        {cityClicked && (
          <MarkerLayer sortingData={sortingByMethode} markers={state.markers} />
        )}

        {cityClicked && <ResetButtonControl onReset={handleReset} />}
      </LeafletMapContainer>
      <Box sx={{ width: "40%" }}>
        {sortingMethods && state.legend && timeSegment && (
          <LegendWithFilters
            onSortingByChange={onSortingByChange}
            sortingByMethod={state.legend}
            onCategoryChange={onCategoryChange}
            sortingMethods={sortingMethods}
            categories={categories}
            timeSegment={timeSegment}
            onTimeSegmentChange={onTimeSegmentChange}
            // setLegendType={setLegendType}
            legendType={legendType}
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomMapContainer;
