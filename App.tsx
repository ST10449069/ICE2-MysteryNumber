import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

function generateRandomNumber(): number {
    return Math.floor(Math.random() * 100) + 1;
}

const App: React.FC = () => {
    const [term, setTerm] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [secretNum, setSecretNum] = useState<number>(generateRandomNumber());
    const [stepCount, setStepCount] = useState<number>(0);

    useEffect(() => {
        setStepCount(0);
    }, [secretNum]);

    function handleChange(text: string): void {
        setTerm(text);
    }

    function checkGuess(): void {
        let newResult = "";

        if (term === "") {
            newResult = "Enter Valid Input";
        } else if (
            isNaN(Number(term)) ||
            parseInt(term) < 1 ||
            parseInt(term) > 100
        ) {
            newResult = "Enter a valid number between 1 and 100";
        } else {
            setStepCount(prev => prev + 1);

            if (parseInt(term) < secretNum) {
                newResult = "Too low! Try again.";
            } else if (parseInt(term) > secretNum) {
                newResult = "Too high! Try again.";
            } else {
                newResult = `🎉 Yippie correct! It took you ${stepCount + 1
                    } ${stepCount + 1 === 1 ? "step" : "steps"}.`;
            }
        }

        setResult(newResult);
    }

    function restartGame(): void {
        setSecretNum(generateRandomNumber());
        setStepCount(0);
        setTerm("");
        setResult("");
    }

    return (
        <View style={styles.container}>
         <Text style={styles.game}>
                🔢 Mystery Number Game
            </Text>
            <Text style={styles.head}>Guess Number between 1 to 100</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your guess"
                onChangeText={handleChange}
                value={term}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={checkGuess}>
                <Text style={styles.buttonText}>Check</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={restartGame}>
                <Text style={styles.buttonText}>Restart Game</Text>
            </TouchableOpacity>

            <Text style={styles.result}>You Guessed: {result}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
        padding: 16,
    },
    head: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 20,
        color: "#333",
    },
    game: {
        fontWeight: "bold",
        fontSize: 23,
        marginBottom: 20,
        color: "#333",
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        width: "80%",
        marginBottom: 20,
        backgroundColor: "#fff",
        fontSize: 18,
    },
    button: {
        backgroundColor: "#007BFF",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginVertical: 8,
    },
    restartButton: {
        backgroundColor: "#FF5733",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
    },
});

export default App;
