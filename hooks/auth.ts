﻿"use client";
import { useSession } from "next-auth/react";
import { DecodedToken } from "@/types/DecodedToken";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthProps {
	requiredRoles?: string[];
	lockedRoles?: string[];
	redirect?: boolean;
}

interface AuthResponse {
	status: "loading" | "unauthorized" | "authorized";
	user?: { accessToken: string } & DecodedToken;
}

const pages = {
	signIn: "/auth/login",
	newUser: "/auth/registrate",
	unauthorized: "/auth/unauthorized"
};

export const useAuth = ({ requiredRoles, lockedRoles, redirect }: AuthProps): AuthResponse => {
	const { data, status } = useSession();
	const path = usePathname();
	const router = useRouter();
	const user = data?.user as { accessToken: string } & DecodedToken;
	const roles = user?.role.split(",").map(role => role.trim().toLowerCase());
	let isAuthorized = status == "authenticated";
	isAuthorized &&= requiredRoles?.every(role => roles?.includes(role.trim().toLowerCase())) ?? true;
	isAuthorized &&= !lockedRoles?.some(role => roles?.includes(role.trim().toLowerCase())) ?? true;

	useEffect(() => {
		if (status == "loading") return;
		if (status == "unauthenticated") {
			if (redirect && path != pages.signIn && path != pages.newUser) router.push(pages.signIn);
			return;
		}

		if (redirect && !isAuthorized && path != pages.unauthorized) router.push(pages.unauthorized);
		else if (redirect && (path == pages.signIn || path == pages.newUser)) router.push("/");
	}, [status]);

	if (status == "loading") return { status };
	if (status == "unauthenticated") return { status: "unauthorized" };
	return { status: isAuthorized ? "authorized" : "unauthorized", user };
};