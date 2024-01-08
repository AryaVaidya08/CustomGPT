export default function ChatMessage(props) {

    const messageProps = {
        name: props.name !== undefined ? props.name : "Human",
        response: props.response !== undefined ? props.response : "Message Not Entered",
        color: props.color !== undefined ? props.color : "#444",
    }

    return (
        <div style={{
            backgroundColor: messageProps.color,
            display: "flex",
            flexDirection: "column",
            alignContent: 'center',
        }}>
            <p style={{
                color: "white",
                fontFamily: "Titillium-SemiBold",
                fontSize: 20,
                paddingLeft: 15,
                paddingRight: 15,
                marginTop: 5,
                marginBottom: 0,
            }}>
                {messageProps.name}
            </p>

            <p style={{
                color: "white",
                fontFamily: "Titillium-Regular",
                fontSize: 15,
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 5,
                paddingBottom: 10,
                marginTop: 0,
                marginBottom: 0,
            }}>
                {messageProps.response}
            </p>
        </div>
    );
}

