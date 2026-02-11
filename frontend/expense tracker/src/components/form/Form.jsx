export default function Form({ onSubmit, children, className }) {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault(); // Prevent default form submission
                onSubmit(event);
            }}
            className={` ${className}`} // Default spacing between form fields
        >
            {children}
        </form>
    );
}
