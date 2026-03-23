export default async function DelayedContent() {

    //simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    return (
        <div>
            <h2>Delayed Content Loaded 🎉</h2>
            <p>This content appeared after a 5-second delay.</p>
        </div>
    )
}