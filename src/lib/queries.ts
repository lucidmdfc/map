// import { defineQuery } from "next-sanity";
export const ESTABLISHMENT_QUERY = `*[_type == "establishment"
  && ($categoryId == "" || properties.category->_id == $categoryId)  
  && ($selectedYear == "" || timeSegment->year == $selectedYear)  
  && ($selectedQuarter == "" || $selectedQuarter in timeSegment->segments[].label)
    && (
    $adminAreaName == "" 
    || administrativeArea->name == $adminAreaName 
    || administrativeArea->parentArea->name == $adminAreaName
    || administrativeArea->parentArea->parentArea->name == $adminAreaName
    || administrativeArea->parentArea->parentArea->parentArea->name == $adminAreaName
  )
] {
  _id,
  name,
  location,
  "timeSegment": timeSegment-> { 
    year,
    segments
  },
  properties,
  "administrativeArea": administrativeArea->{
    name,
    "province": parentArea->{
      name,
      "city": parentArea->{
        name,
        "region": parentArea->{
          name,
        }
      }
    }
  }
}
`;
// && ($selectedQuarter == "" || timeSegment->segments[label == $selectedQuarter && type == "Quarter"])
// && ($selectedMonth == "" || timeSegment->segments[label == $selectedMonth && type == "Month"])
export const CATEGORY_QUERY = `*[_type == "category"] {
  _id,
  name
}`;

export const POPULATION_SEGMENTS_QUERY = `
  *[_type == "populationSegments"]{
    _id,
    property,
    type,
    items[]{
      label,
      NumericRanges
    }
  }
`;

export const TIME_SEGMENT_QUERY = `
*[_type == "timeSegment"]{
  _id,
  year,
  segments[]{
    type,
    label
  }
}
`;
