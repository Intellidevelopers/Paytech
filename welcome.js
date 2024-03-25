// Assume you have a function to fetch the user's name, for example:
function fetchUserName() {
    // You can replace this with your own logic to fetch the user's name
    return "John Doe";
}

// Call the fetchUserName function to get the user's name
const userName = fetchUserName();

// Trigger the SweetAlert with the fetched user's name
Swal.fire({
    title: userName,
    text: "Referral withdrawal portal is opened! Non-referral withdrawal payments start today."
});
