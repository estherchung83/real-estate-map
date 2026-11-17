
'use client';

import { useQuery } from '@apollo/client/react';
import { GET_PROPERTY } from '@/lib/graphql/property';
import PropertyDetails, {
    type Property,
} from '@/components/PropertyDetails';

interface GetPropertyData {
    reonomyProperties: {
        items: Property[];
    };
}

interface TaxAssessorsProps {
    parcelId: string | null;
}

export default function TaxAssessors({
    parcelId,
}: TaxAssessorsProps) {

    const { loading, error, data } = useQuery<GetPropertyData>(
        GET_PROPERTY,
        {
        variables: { parcelId },
        skip: !parcelId,
        }
    );

    const property = data?.reonomyProperties?.items?.[0];

    return (
        <div className="h-full overflow-y-auto bg-gray-50 p-4">

        {/* Sidebar Header */}
        <div className="mb-5">
            <h2 className="text-xl font-bold text-black">
            Building & Lot
            </h2>

            <p className="mt-1 text-sm text-gray-500">
            Property Information
            </p>
        </div>

        {/* No parcel selected */}
        {!parcelId && (
            <p className="text-sm text-gray-500">
            Select a parcel on the map to view property information.
            </p>
        )}

        {/* Loading */}
        {loading && (
            <p className="text-sm text-gray-500">
            Loading property information...
            </p>
        )}

        {/* Error */}
        {error && (
            <div className="rounded-md border border-red-200 bg-white p-4">
            <p className="text-sm text-red-600">
                Error fetching property information.
            </p>

            <p className="mt-1 text-xs text-gray-500">
                {error.message}
            </p>
            </div>
        )}

        {/* No property found */}
        {parcelId && !loading && !error && !property && (
            <div className="rounded-md border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-600">
                No data for this parcel.
            </p>
            </div>
        )}

        {/* Property information */}
        {property && !loading && !error && (
            <div className="space-y-4">

            {/* Address */}
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide font-semibold text-black">
                Property Address
                </p>

                <p className="mt-2 text-base font-semibold text-black">
                {property.address_line1 || '—'}
                </p>

                <p className="mt-2 break-all text-xs text-gray-400">
                Parcel ID: {property.parcel_id || '—'}
                </p>
            </div>

            {/* Dynamic property cards */}
            <PropertyDetails property={property} />

            </div>
        )}

        </div>
    );
}
