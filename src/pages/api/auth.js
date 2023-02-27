// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res,next) {
    console.log("chhaya");
    res.status(200).json({ name: 'John Doe' })
  }
  