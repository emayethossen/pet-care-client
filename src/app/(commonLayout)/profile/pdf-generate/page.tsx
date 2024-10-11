"use client";

import { useForm } from "react-hook-form";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; 
import { useState } from "react";

interface PetData {
    age: number;
    weight: number;
    petType: string;
}

const Calculator = () => {
    const { register, handleSubmit } = useForm<PetData>();
    const [pdfData, setPdfData] = useState<Blob | null>(null);

    const onSubmit = async (data: PetData) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { age, weight, petType } = data;

        const nutritionInfo = `
      Pet Type: ${petType}
      Age: ${age} years
      Weight: ${weight} kg
      
      Based on this, here are the recommended nutrition guidelines:
      - Protein: ${weight * 2} grams/day
      - Fat: ${weight * 1.5} grams/day
      - Carbohydrates: ${weight * 3} grams/day
    `;

        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 18;

        page.drawText(nutritionInfo, {
            x: 50,
            y: 350,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        setPdfData(blob);
    };

    const downloadPDF = () => {
        if (pdfData && typeof window !== "undefined") {
            const url = window.URL.createObjectURL(pdfData);
            const a = document.createElement("a");
            a.href = url;
            a.download = "nutrition-chart.pdf";
            a.click();
            window.URL.revokeObjectURL(url); // Clean up the URL object
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Pet Nutrition Calculator</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm font-medium">Pet Type</label>
                    <input
                        {...register("petType", { required: true })}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="e.g. Dog, Cat"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Age (years)</label>
                    <input
                        type="number"
                        {...register("age", { required: true, min: 0 })}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="e.g. 3"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Weight (kg)</label>
                    <input
                        type="number"
                        {...register("weight", { required: true, min: 0 })}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="e.g. 20"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
                    Generate PDF
                </button>
            </form>

            {pdfData && (
                <button
                    onClick={downloadPDF}
                    className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg"
                >
                    Download PDF
                </button>
            )}
        </div>
    );
};

export default Calculator;
