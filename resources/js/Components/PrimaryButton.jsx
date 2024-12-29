export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `bg-primary-default hover:bg-primary-hover active:bg-primary-active inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest text-white transition duration-150 ease-in-out focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
            // style={{ backgroundColor: "#4D8E92" }}
        >
            {children}
        </button>
    );
}
