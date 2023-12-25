import { cn } from "@/lib/utils";

const Quote = ({ className }: { className: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <path
        d="M2.00016 14.0002C4.00016 14.0002 6.66683 13.3335 6.66683 8.66685V3.33352C6.66683 2.50018 6.16283 1.98885 5.3335 2.00018H2.66683C1.8335 2.00018 1.3335 2.50018 1.3335 3.31485V7.33352C1.3335 8.16685 1.8335 8.66685 2.66683 8.66685C3.3335 8.66685 3.3335 8.66685 3.3335 9.33352V10.0002C3.3335 10.6669 2.66683 11.3335 2.00016 11.3335C1.3335 11.3335 1.3335 11.3389 1.3335 12.0209V13.3335C1.3335 14.0002 1.3335 14.0002 2.00016 14.0002Z"
        stroke="#990000"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0002 14.0002C12.0002 14.0002 14.6668 13.3335 14.6668 8.66685V3.33352C14.6668 2.50018 14.1622 1.98885 13.3335 2.00018H10.6668C9.8335 2.00018 9.3335 2.50018 9.3335 3.31485V7.33352C9.3335 8.16685 9.8335 8.66685 10.6668 8.66685H11.1668C11.1668 10.1669 11.3335 11.3335 9.3335 11.3335V13.3335C9.3335 14.0002 9.3335 14.0002 10.0002 14.0002Z"
        stroke="#6B7280"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Quote;
