import * as Yup from "yup";

export const EmailScheme = Yup.object().shape({
	email: Yup.string()
		.email("email is invalid")
		.required("email is required"),
});