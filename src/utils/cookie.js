export const setCookies = (res, { accessToken, refreshToken }) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true, // Tidak bisa diakses oleh JS frontend (aman dari XSS)
    secure: true, // Wajib true kalau sameSite "none" (hanya untuk HTTPS)
    sameSite: "none", // WAJIB "none" agar cookie bisa dikirim beda domain
    maxAge: 60 * 60 * 1000,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none", // WAJIB "none"
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
