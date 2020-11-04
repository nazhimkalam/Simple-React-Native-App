import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	SafeAreaView,
	TextInput,
	ScrollView,
	Platform,
	Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function App() {
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState();
	const [income, setIncome] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setTotal(income.reduce((total, income) => total + Number(income.amount), 0));
	}, [income]);

	const addIncome = () => {
		setIncome([
			...income,
			{
				description: description,
				amount: amount,
			},
		]);

		setDescription('');
		setAmount('');
	};

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.titleText}>INCOME TRACKING APP</Text>
				<Text style={styles.titleText}>Total Income: ${total}</Text>
			</View>

			<View>
				<LineChart
					data={{
						labels: ['January', 'February', 'March', 'April', 'May', 'June'],
						datasets: [
							{
								data: [
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
								],
							},
						],
					}}
					width={Dimensions.get('window').width} // from react-native
					height={220}
					yAxisLabel="$"
					yAxisSuffix="k"
					yAxisInterval={1} // optional, defaults to 1
					chartConfig={{
						backgroundColor: '#e26a00',
						backgroundGradientFrom: 'black',
						backgroundGradientTo: 'green',
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16,
						},
						propsForDots: {
							r: '6',
							strokeWidth: '2',
							stroke: '#ffa726',
						},
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			</View>

			<TextInput
				style={styles.input}
				value={description}
				placeholder="Enter a description"
				onChangeText={(text) => setDescription(text)}
			/>

			<TextInput
				style={styles.input}
				value={amount}
				placeholder="Enter the amount you made in USD ($)"
				keyboardType="numeric"
				onChangeText={(text) => setAmount(text)}
			/>

			<Button disabled={!amount && !description} title="💲Add Income" onPress={addIncome} />

			{income.map((income) => (
				<View>
					<Text style={styles.titleText}>{income.description}</Text>
					<Text style={styles.titleText}>${income.amount}</Text>
					<hr style={{ width: '50%' }} />
				</View>
			))}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	titleText: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 30,
		fontSize: 15,
		fontWeight: 'bold',
	},
	input: {
		height: 40,
		margin: 20,
		marginTop: 10,
	},
	container:{
		display: 'flex',
		justifyContent: 'space-around'
	}
	// Add this style for android devices cuz the SafeAreaView doesn't work for Android Devices
	// AndroidSafeArea: {
	// 	flex: 1,
	// 	backgroundColor: 'white',
	// 	paddingTop: Platform.OS === 'android' ? 25 : 0,
	// },
});
