import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginVertical: 10,
    padding: 20,
    width: "80%"  ,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  personalDetailsContainer: {
    backgroundColor: "#334082",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    padding: 16,
    // iOS shadow properties
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow property
    elevation: 3,
  },
  personalDetailsContent: {
    padding: 16,
  },
  personalDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  personalDetailsItem: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#000000",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    width: "80%",
  },
  homeImage: {
    width: "80%",
    height: 200,
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
    backgroundColor: "#bff4fa",
    color: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "#bff4fa",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,


    color: "#000",
    marginBottom: 10,
  },
  datePickerContainer: {
    width: "80%",
    backgroundColor: "#244347",
    color: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000",
    color: "#000000",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  modalContent: {
    backgroundColor: "#334082",
    borderRadius: 12,
    overflow: "hidden",
    padding: 16,
    width: "80%",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    alignItems: "center",
  },
  modalItem: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    textAlign: "left",  
  },
  modalLabel: {
    fontSize: 16,
    color: "#fff",    marginBottom: 5,
    textAlign: "left",
  },
  confirmationContainer: {
    backgroundColor: "#334082",
    borderRadius: 12,
    overflow: "hidden",
    padding: 16,
    width: "80%",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
confirmationContent: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
confirmationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
confirmationMessage: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
confirmationButtons: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  confirmationButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  picker: {
    color: "#000000",
    fontSize: 16,
    backgroundColor: "#bff4fa",
  }


});

export default styles;
