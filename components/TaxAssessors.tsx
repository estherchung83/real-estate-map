'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_TAX_ASSESSORS = gql`
    query {
        attomTaxAssessors {
            items {
                PropertyAddressFull
                PropertyLatitude
                PropertyLongitude
                ATTOM_ID
                parcel_id
            }
        }
    }
`;

type TaxAssessor = { PropertyAddressFull: string; ATTOM_ID: string };

export default function TaxAssessors() {
    const { loading, error, data } = useQuery<{
        attomTaxAssessors: { items: TaxAssessor[] };
    }>(GET_TAX_ASSESSORS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data?.attomTaxAssessors.items.map(({ PropertyAddressFull, ATTOM_ID }) => (
                <p key={ATTOM_ID}>{PropertyAddressFull}</p>
            ))}
        </div>
    );
}