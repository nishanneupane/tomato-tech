import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const CLASS_NAMES = [
  'Tomato___Bacterial_spot',
  'Tomato___Early_blight',
  'Tomato___Late_blight',
  'Tomato___Leaf_Mold',
  'Tomato___Septoria_leaf_spot',
  'Tomato___Spider_mites Two-spotted_spider_mite',
  'Tomato___Target_Spot',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
  'Tomato___Tomato_mosaic_virus',
  'Tomato___healthy'
];

async function readFileAsImage(data: ArrayBuffer): Promise<Buffer> {
  return Buffer.from(data);
}

function getDiseaseDescription(disease: string): string {
  const descriptions: { [key: string]: string } = {
    'Tomato___Bacterial_spot': 'Bacterial spot is a common disease caused by Xanthomonas bacteria. It affects leaves, fruits, and stems, causing spotting and potential yield loss.',
    'Tomato___Early_blight': 'Early blight is a fungal disease caused by Alternaria solani. It typically affects older leaves first and can cause significant defoliation.',
    'Tomato___Late_blight': 'Late blight, caused by Phytophthora infestans, is a devastating disease that can quickly destroy entire crops in cool, wet conditions.',
    'Tomato___Leaf_Mold': 'Leaf mold is a fungal disease caused by Passalora fulva. It thrives in high humidity and can cause significant yield loss in greenhouse tomatoes.',
    'Tomato___Septoria_leaf_spot': 'Septoria leaf spot is caused by the fungus Septoria lycopersici. It primarily affects leaves and can cause severe defoliation in wet conditions.',
    'Tomato___Spider_mites Two-spotted_spider_mite': 'Spider mites are tiny arachnids that can cause stippling on leaves. They thrive in hot, dry conditions and can quickly multiply.',
    'Tomato___Target_Spot': 'Target spot is caused by the fungus Corynespora cassiicola. It affects leaves, stems, and fruits, causing circular lesions with concentric rings.',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus': 'TYLCV is a viral disease transmitted by whiteflies. It causes stunting, leaf curling, and significant yield loss.',
    'Tomato___Tomato_mosaic_virus': 'Tomato mosaic virus is highly contagious and can cause mottling and distortion of leaves, as well as stunted growth.',
    'Tomato___healthy': 'The plant appears healthy with no visible signs of disease or pest infestation.'
  };
  return descriptions[disease] || 'No description available for this condition.';
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    let file: Blob | null = null;
    if (contentType && contentType.includes('multipart/form-data')) {
      try {
        const formData = await request.formData();
        file = formData.get('file') as Blob | null;
      } catch (formDataError) {
        console.error('Error parsing FormData:', formDataError);
        return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
      }
    } else if (contentType && contentType.includes('application/json')) {
      try {
        const body = await request.json();
        if (body.file) {
          const base64Data = body.file.split(',')[1];
          const binaryData = Buffer.from(base64Data, 'base64');
          file = new Blob([binaryData], { type: 'image/jpeg' });
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const imageData = await readFileAsImage(bytes);

    const imageName = `${Date.now()}_uploaded_image.jpg`;
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    const imagePath = path.join(uploadsDir, imageName);
    await fs.promises.writeFile(imagePath, imageData);

    const randomDisease = CLASS_NAMES[Math.floor(Math.random() * CLASS_NAMES.length)];
    const description = getDiseaseDescription(randomDisease);
    const treatmentRecommendations = generateTreatmentRecommendations(randomDisease);

    return NextResponse.json({
      disease: randomDisease,
      confidence: Math.random().toFixed(2),
      description: description,
      treatmentRecommendations: treatmentRecommendations,
      imagePath: `/uploads/${imageName}`
    });
  } catch (error) {
    console.error('Error in processing:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function generateTreatmentRecommendations(disease: string): string[] {
  const generalRecommendations = [
    "Ensure proper plant spacing for good air circulation.",
    "Water at the base of the plant to keep foliage dry.",
    "Remove and destroy infected plant material.",
    "Practice crop rotation to reduce disease pressure.",
    "Use disease-resistant varieties when possible."
  ];

  const specificRecommendations: { [key: string]: string[] } = {
    'Tomato___Bacterial_spot': [
      "Apply copper-based fungicides as a preventive measure.",
      "Avoid overhead irrigation to reduce leaf wetness.",
      "Sanitize tools and equipment regularly."
    ],
    'Tomato___Early_blight': [
      "Apply fungicides containing chlorothalonil or copper.",
      "Mulch around plants to prevent soil splash.",
      "Prune lower leaves to improve air circulation."
    ],
    'Tomato___Late_blight': [
      "Apply fungicides containing mancozeb or chlorothalonil.",
      "Monitor weather conditions and treat preventively during high-risk periods.",
      "Destroy all infected plants immediately."
    ],
    'Tomato___Leaf_Mold': [
      "Improve greenhouse ventilation to reduce humidity.",
      "Apply fungicides containing chlorothalonil or mancozeb.",
      "Remove and destroy infected leaves promptly."
    ],
    'Tomato___Septoria_leaf_spot': [
      "Apply fungicides containing chlorothalonil or copper.",
      "Avoid working with plants when they're wet.",
      "Stake plants to keep them off the ground."
    ],
    'Tomato___Spider_mites Two-spotted_spider_mite': [
      "Introduce predatory mites as a biological control.",
      "Apply insecticidal soaps or horticultural oils.",
      "Increase humidity to discourage mite populations."
    ],
    'Tomato___Target_Spot': [
      "Apply fungicides containing azoxystrobin or difenoconazole.",
      "Improve air circulation by proper pruning and plant spacing.",
      "Avoid overhead irrigation."
    ],
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus': [
      "Control whitefly populations using insecticides or biological controls.",
      "Use reflective mulches to repel whiteflies.",
      "Remove and destroy infected plants to prevent spread."
    ],
    'Tomato___Tomato_mosaic_virus': [
      "Remove and destroy infected plants immediately.",
      "Disinfect tools and hands when handling plants.",
      "Control aphid populations, which can spread the virus."
    ],
    'Tomato___healthy': [
      "Continue with regular maintenance and monitoring.",
      "Implement preventive measures to maintain plant health.",
      "Scout regularly for early signs of pests or diseases."
    ]
  };

  return [...generalRecommendations, ...(specificRecommendations[disease] || [])];
}
