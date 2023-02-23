// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const pincode = {
    "455336": ["dewas","madhya pradesh"],
    "320008": ["Maninagar", "Ahmedabad"],
    "560034": ["bangalore","karnataka"],
    "110006": ["delhi", "chandni chowk"]

  }
  res.status(200).json(pincode)
}
