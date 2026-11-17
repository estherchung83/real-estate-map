
import { gql } from '@apollo/client';

export const GET_PROPERTY = gql`
    query GetProperty($parcelId: String) {
        reonomyProperties(
        filter: { parcel_id: { eq: $parcelId } }
        ) {
        items {
            # Property Identification
            parcel_id
            address_line1

            # Building
            year_built
            year_renovated
            floors
            sum_buildings_nbr
            existing_floor_area_ratio
            commercial_units
            residential_units
            total_units
            building_area

            # Lot
            asset_type
            lot_size_sqft
            lot_size_acres
            zoning
            census_tract
            opp_zone

            # Location
            msa_name
            fips_county
            municipality
            mcd_name
            neighborhood_name
            legal_description
        }
        }
    }
`;
