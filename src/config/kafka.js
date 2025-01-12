import { KafkaClient, Producer, Consumer } from 'kafka-node';

// Create Kafka client
const client = new KafkaClient({ kafkaHost: process.env.KAFKA_HOST });

// Create Kafka producer
export const producer = new Producer(client);

// Handle producer readiness or errors
producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
    console.error('Error with Kafka Producer:', error);
});

// Create Kafka consumer
export const consumer = new Consumer(
    client,
    [{ topic: 'votes', partition: 0 }],
    { autoCommit: true } // Automatically commit offsets
);

// Handle consumer errors
consumer.on('error', (error) => {
    console.error('Error with Kafka Consumer:', error);
});


