// pages/api/generate.js

export default async function handler(req, res) {
  // السماح فقط للطلبات POST
  if (req.method === 'POST') {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'الرجاء إرسال prompt في الطلب' });
    }

    // هنا يمكن وضع أي منطق تريده، على سبيل المثال توليد نص أو رد
    const generatedText = `تم استلام طلبك: "${prompt}" ✅`;

    // إعادة النتيجة
    return res.status(200).json({ result: generatedText });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
