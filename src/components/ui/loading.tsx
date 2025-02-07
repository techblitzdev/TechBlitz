export default function LoadingSpinner() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <g>
        <circle cx="12" cy="2.5" r="1.5" fill="currentColor" opacity=".14" />
        <circle cx="16.75" cy="3.77" r="1.5" fill="currentColor" opacity=".29" />
        <circle cx="20.23" cy="7.25" r="1.5" fill="currentColor" opacity=".43" />
        <circle cx="21.5" cy="12" r="1.5" fill="currentColor" opacity=".57" />
        <circle cx="20.23" cy="16.75" r="1.5" fill="currentColor" opacity=".71" />
        <circle cx="16.75" cy="20.23" r="1.5" fill="currentColor" opacity=".86" />
        <circle cx="12" cy="21.5" r="1.5" fill="currentColor" />
        <animateTransform
          attributeName="transform"
          calcMode="discrete"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
        />
      </g>
    </svg>
  );
}
