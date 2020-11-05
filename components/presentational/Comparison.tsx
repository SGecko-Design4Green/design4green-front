const getPercent = (current: number, reference: number): number =>
    Math.round(((100 * current / reference) - 100) * 100) / 100;

const GREEN = '#03bd5b';
const RED = '#d63626';

const Percent = ({ percent }: { percent: number }) => {
    const color = percent > 0 ? RED : GREEN;
    const prefix = percent > 0 ? '+' : '';

    return <span style={{ color }}>{prefix}{percent}%</span>;
}

export interface ComparisonProps {
    readonly reference: number;
    readonly label: string;
    readonly value: number;
}

const Comparison = ({ label, value, reference }: ComparisonProps) => {

    const percent = getPercent(value, reference);

    return <><span>VS {label} {reference.toFixed(2)} (<Percent percent={percent} />)</span><br /></>;
}
    

export default Comparison;
