import "./style.css";

type LoadingSpinnerProps = {
  color: string;
};

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  const { color } = props;

  return (
    <div className='LoadingSpinner'>
      <svg viewBox='0 0 50 50'>
        <circle cx='25' cy='25' r='20' fill='none' strokeWidth='5' stroke={color}></circle>
      </svg>
    </div>
  );
}