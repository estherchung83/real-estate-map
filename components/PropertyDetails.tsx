
import description from '@/lib/building-and-lot-fields-description.json';

export interface Property {
    [key: string]: unknown;
    parcel_id: string | null;
    address_line1: string | null;
    building_area: number | null;
    }

    interface Field {
    label: string;
    fieldNameOrExtractor: string;
    unit?: string;
    }

    interface Card {
    title: string;
    width?: string;
    component?: string;
    hideIf?: string;
    fields?: Field[];
    }

    interface PropertyDetailsProps {
    property: Property;
    }

    function formatBoolean(value: unknown): string {
    if (value === true || value === 1) return 'Yes';
    if (value === false || value === 0) return 'No';
    return '—';
    }

    // Custom field extractors
    const extractors: Record<
    string,
    (p: Property) => unknown
    > = {
    '(dataItem) => formatBoolean(dataItem.opp_zone)': (p) =>
        formatBoolean(p.opp_zone),
    };

    // Retrieve and format field values
    function getValue(p: Property, field: Field): string {
    const key = field.fieldNameOrExtractor;

    const raw = extractors[key]
        ? extractors[key](p)
        : p[key];

    if (raw === null || raw === undefined || raw === '') {
        return '—';
    }

    const text =
        typeof raw === 'number'
        ? raw.toLocaleString()
        : String(raw);

    return field.unit?.trim()
        ? `${text} ${field.unit.trim()}`
        : text;
    }

    // Reusable row
    function Row({
    label,
    value,
    }: {
    label: string;
    value: string;
    }) {
    return (
        <div className="flex min-h-[35px] items-center justify-between gap-3 border-b border-dotted border-gray-300 py-1.5 last:border-0">
        <span className="text-sm font-medium text-gray-800">
            {label}
        </span>

        <span className="text-right text-sm text-gray-700">
            {value}
        </span>
        </div>
    );
    }

    export default function PropertyDetails({
    property,
    }: PropertyDetailsProps) {
    const cards = (
        description as { cards: Card[] }
    ).cards;

    return (
        <div className="grid grid-cols-1 gap-4">

        {cards.map((card) => {

            // Building SF Breakdown special component
            if (card.component === 'BuildingAreaBreakdownTable') {
            if (!property.building_area) return null;

            return (
                <section
                key={card.title}
                className="rounded-md border border-gray-200 bg-white p-4 shadow-sm"
                >
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                    {card.title}
                </h3>

                <p className="text-sm text-gray-700">
                    Building Area: {
                    typeof property.building_area === 'number'
                        ? property.building_area.toLocaleString()
                        : property.building_area
                    } sf
                </p>
                </section>
            );
            }

            // Regular property cards
            if (!card.fields) return null;

            return (
            <section
                key={card.title}
                className={`rounded-md border border-gray-200 bg-white p-4 shadow-sm ${
                card.width === 'full' ? 'col-span-full' : ''
                }`}
            >
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                {card.title}
                </h3>

                {card.fields.map((field) => (
                <Row
                    key={field.label}
                    label={field.label}
                    value={getValue(property, field)}
                />
                ))}
            </section>
            );
        })}

        </div>
    );
}
