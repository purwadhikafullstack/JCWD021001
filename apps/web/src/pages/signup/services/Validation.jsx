import * as Yup from "yup";

export const SignUpScheme = Yup.object().shape({
	email: Yup.string()
		.email("email is invalid")
		.required("email is required"),
	username: Yup.string().required("username is required"),
});