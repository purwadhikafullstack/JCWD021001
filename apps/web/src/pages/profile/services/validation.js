import * as Yup from "yup";

export const EmailScheme = Yup.object().shape({
	email: Yup.string()
		.email("email is invalid")
		.required("email is required"),
});

export const UsernameScheme = Yup.object().shape({
    username: Yup.string()
    .required("username is required"),
})

export const PasswordScheme = Yup.object().shape({
	password: Yup.string()
		.required("Please Enter your password")
		.test(
			"regex",
			"Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
			(val) => {
				const regExp = new RegExp(
					"^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
				);
				console.log(regExp.test(val), regExp, val);
				return regExp.test(val);
			}
		),
        confirmationPassword: Yup.string().test(
            "passwords-match",
            "Passwords must match",
            function (value) {
                return this.parent.password === value;
            }
        ),
})