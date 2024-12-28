document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        // Clear previous error messages
        const errorBlocks = document.querySelectorAll(".help-block.with-errors ul");
        errorBlocks.forEach((block) => {
            block.innerHTML = "";
            block.style.display = "none";
        });

        // Validate fields
        const name = document.getElementById("name");
        if (name.value.trim() === "") {
            setError(name, "Please enter your name");
            isValid = false;
        }

        const email = document.getElementById("email");
        if (!validateEmail(email.value.trim())) {
            setError(email, "Please enter a valid email");
            isValid = false;
        }

        const phone = document.getElementById("phone_number");
        if (!validatePhone(phone.value.trim())) {
            setError(phone, "Please enter a valid phone number");
            isValid = false;
        }

        const website = document.getElementById("msg_subject");
        if (!validateURL(website.value.trim())) {
            setError(website, "Please enter a valid website URL");
            isValid = false;
        }

        const message = document.getElementById("message");
        if (message.value.trim() === "") {
            setError(message, "Write your message");
            isValid = false;
        }

        if (isValid) {
            alert("Form submitted successfully!");
            form.reset();
        }
    });

    // Real-time validation on blur (when the field loses focus)
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("blur", function () {
            validateField(input);
        });

        // Real-time validation while typing
        input.addEventListener("input", function () {
            clearError(input);
            validateField(input);
        });
    });

    // Validate a specific field
    function validateField(input) {
        const name = input.name;
        if (name === "name") {
            if (input.value.trim() === "") {
                setError(input, "Please enter your name");
            }
        } else if (name === "email") {
            if (!validateEmail(input.value.trim())) {
                setError(input, "Please enter a valid email");
            }
        } else if (name === "phone_number") {
            if (!validatePhone(input.value.trim())) {
                setError(input, "Please enter a valid phone number");
            }
        } else if (name === "msg_subject") {
            if (!validateURL(input.value.trim())) {
                setError(input, "Please enter a valid website URL");
            }
        } else if (name === "message") {
            if (input.value.trim() === "") {
                setError(input, "Write your message");
            }
        }
    }

    // Show error message
    function setError(input, message) {
        const errorBlock = input.closest(".form-group").querySelector(".help-block.with-errors ul");

        // Check if error message already exists
        if (!errorBlock.querySelector("li")) {
            const li = document.createElement("li");
            li.textContent = message;
            errorBlock.appendChild(li);
            errorBlock.style.display = "block";
        }
    }

    // Clear error message
    function clearError(input) {
        const errorBlock = input.closest(".form-group").querySelector(".help-block.with-errors ul");
        if (errorBlock) {
            errorBlock.innerHTML = "";
            errorBlock.style.display = "none";
        }
    }

    // Email validation pattern
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Phone validation pattern
    function validatePhone(phone) {
        const phonePattern = /^[0-9]{10,15}$/;
        return phonePattern.test(phone);
    }

    // URL validation pattern
    function validateURL(url) {
        const urlPattern = /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+([\/\w\-]*)*$/;
        return urlPattern.test(url);
    }
});

