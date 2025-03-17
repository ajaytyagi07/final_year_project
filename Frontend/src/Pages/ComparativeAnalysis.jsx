import React from "react";

const ComparativeAnalysis = () => {
    const models = [
        { name: "KNN", accuracy: "65%", precision: "60%", recall: "55%", latency: "200 ms" },
        { name: "SVM", accuracy: "75%", precision: "72%", recall: "70%", latency: "180 ms" },
        { name: "OpenCV", accuracy: "85%", precision: "78%", recall: "78%", latency: "30 ms (Fastest)" },
        { name: "TensorFlow", accuracy: "95%", precision: "93%", recall: "92%", latency: "70 ms" },
    ];

    const styles = {
        container: { padding: "20px", backgroundColor: "#f3f3f3", minHeight: "100vh" },
        title: { fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" },
        subtitle: { fontSize: "22px", fontWeight: "bold", marginTop: "20px" },
        text: { marginTop: "10px", color: "#555" },
        list: { paddingLeft: "20px", marginTop: "10px", color: "#555" },
        listItem: { marginBottom: "5px" },
        tableContainer: { overflowX: "auto", marginTop: "15px" },
        table: { width: "100%", borderCollapse: "collapse", background: "white", border: "1px solid #ccc" },
        thTd: { border: "1px solid #ddd", padding: "10px", textAlign: "center" },
        th: { backgroundColor: "#eee", fontWeight: "bold" },
        imageSection: { textAlign: "center", marginTop: "20px" },
        image: { width: "50%", display: "block", margin: "0 auto", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Comparative Analysis of KNN, SVM, OpenCV, and TensorFlow in Vision Lock</h1>

            <section>
                <h2 style={styles.subtitle}>About Vision Lock</h2>
                <p style={styles.text}>
                    Online proctoring systems ensure fair examinations by detecting cheating attempts, face verification,
                    eye tracking, and object detection. Various ML and DL models are used for these tasks. This report compares:
                </p>
                <ul style={styles.list}>
                    <li style={styles.listItem}>K-Nearest Neighbors (KNN)</li>
                    <li style={styles.listItem}>Support Vector Machine (SVM)</li>
                    <li style={styles.listItem}>OpenCV (Traditional CV techniques)</li>
                    <li style={styles.listItem}>TensorFlow (Deep Learning-based models like CNNs)</li>
                </ul>
            </section>

            <section>
                <h2 style={styles.subtitle}>Key Performance Metrics</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}><strong>Accuracy:</strong> Percentage of correct detections</li>
                    <li style={styles.listItem}><strong>Precision:</strong> How many detected cheating cases are actually correct</li>
                    <li style={styles.listItem}><strong>Recall:</strong> How many actual cheating cases were detected</li>
                    <li style={styles.listItem}><strong>Latency:</strong> Time taken to process an image (lower is better)</li>
                    <li style={styles.listItem}><strong>False Positive Rate (FPR):</strong> Wrongly flagged users (lower is better)</li>
                </ul>
            </section>

            <section>
                <h2 style={styles.subtitle}>Accuracy Comparison of Models</h2>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Model</th>
                                <th style={styles.th}>Accuracy (%)</th>
                                <th style={styles.th}>Precision (%)</th>
                                <th style={styles.th}>Recall (%)</th>
                                <th style={styles.th}>Latency (ms)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models.map((model, index) => (
                                <tr key={index}>
                                    <td style={styles.thTd}>{model.name}</td>
                                    <td style={styles.thTd}>{model.accuracy}</td>
                                    <td style={styles.thTd}>{model.precision}</td>
                                    <td style={styles.thTd}>{model.recall}</td>
                                    <td style={styles.thTd}>{model.latency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section style={styles.imageSection}>
                <img src="src/Pages/accuracy_comparison.jpg" alt="Comparative Analysis" style={styles.image} />
            </section>

            <section>
                <h2 style={styles.subtitle}>Conclusion</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}><strong>TensorFlow</strong> (CNNs) has the highest accuracy (95%), making it the best for online proctoring.</li>
                    <li style={styles.listItem}><strong>OpenCV</strong> performs well (85%) but lacks deep learning-based tracking.</li>
                    <li style={styles.listItem}><strong>KNN and SVM</strong> have lower accuracy (65%-75%), making them less reliable.</li>
                    <li style={styles.listItem}><strong>OpenCV</strong> is the fastest (30ms), while KNN is the slowest (200ms).</li>
                </ul>
            </section>
        </div>
    );
};

export default ComparativeAnalysis;
