import { Injectable } from '@angular/core';
import { Doctor, DoctorSchedule } from '../models/doctor.model';
import { VetService } from '../models/service.model';
import { GroomingPackage } from '../models/grooming.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class MockDataService {

  // ─── Doctors ─────────────────────────────────────────
  getDoctors(): Doctor[] {
    return [
      {
        id: 'doc-1',
        name: 'Dr. Priya Sharma',
        photo: '/images/doc-priya.jpg',
        qualification: 'BVSc & AH, MVSc (Surgery)',
        specialties: ['Surgery', 'Orthopaedics'],
        primarySpecialty: 'Senior Veterinary Surgeon',
        experience: 12,
        experienceText: '12+ Years Experience',
        bio: 'Specialist in advanced orthopedic and soft tissue surgeries with expertise in trauma management.',
        languages: ['English', 'Hindi', 'Telugu'],
        availableTimings: this.generateSchedule(),
        rating: 4.9,
        reviewCount: 342,
        consultationFee: 800,
        isAvailable: true,
        isEmergencyDoctor: true,
        createdAt: new Date()
      },
      {
        id: 'doc-2',
        name: 'Dr. Arjun Reddy',
        photo: '/images/doc-arjun.jpg',
        qualification: 'BVSc & AH, MVSc (Medicine)',
        specialties: ['Medicine', 'Cardiology'],
        primarySpecialty: 'Internal Medicine Specialist',
        experience: 10,
        experienceText: '10+ Years Experience',
        bio: 'Expert in diagnosing and treating complex internal medicine cases with a special focus on cardiac care.',
        languages: ['English', 'Hindi', 'Telugu'],
        availableTimings: this.generateSchedule(),
        rating: 4.8,
        reviewCount: 528,
        consultationFee: 1000,
        isAvailable: true,
        isEmergencyDoctor: false,
        createdAt: new Date()
      },
      {
        id: 'doc-3',
        name: 'Dr. Neha Verma',
        photo: '/images/doc-neha.jpg',
        qualification: 'BVSc & AH, MVSc (Dermatology)',
        specialties: ['Dermatology', 'Allergy'],
        primarySpecialty: 'Dermatology Specialist',
        experience: 8,
        experienceText: '8+ Years Experience',
        bio: 'Dedicated dermatologist specializing in skin allergies, chronic ear infections, and autoimmune skin disorders.',
        languages: ['English', 'Hindi'],
        availableTimings: this.generateSchedule(),
        rating: 4.9,
        reviewCount: 215,
        consultationFee: 900,
        isAvailable: true,
        isEmergencyDoctor: false,
        createdAt: new Date()
      },
      {
        id: 'doc-4',
        name: 'Dr. Karthik Naidu',
        photo: '/images/doc-karthik.jpg',
        qualification: 'BVSc & AH, MVSc (Radiology)',
        specialties: ['Radiology', 'Ultrasound'],
        primarySpecialty: 'Radiology Specialist',
        experience: 7,
        experienceText: '7+ Years Experience',
        bio: 'Specialist in digital radiography, 4D ultrasound, CT screening, and non-invasive diagnostic imaging.',
        languages: ['English', 'Telugu'],
        availableTimings: this.generateSchedule(),
        rating: 4.7,
        reviewCount: 189,
        consultationFee: 750,
        isAvailable: true,
        isEmergencyDoctor: false,
        createdAt: new Date()
      },
      {
        id: 'doc-5',
        name: 'Dr. Lakshmi Devi',
        photo: '/images/doc-priya.jpg',
        qualification: 'BVSc & AH, PhD (Neurology)',
        specialties: ['Neurology', 'Critical Care'],
        primarySpecialty: 'Neurology Specialist',
        experience: 18,
        experienceText: '18+ Years Experience',
        bio: 'Renowned neurologist with extensive experience in treating neurological disorders in companion animals.',
        languages: ['English', 'Hindi', 'Telugu'],
        availableTimings: this.generateSchedule(),
        rating: 4.9,
        reviewCount: 412,
        consultationFee: 1200,
        isAvailable: true,
        isEmergencyDoctor: true,
        createdAt: new Date()
      },
      {
        id: 'doc-6',
        name: 'Dr. Arjun Rao',
        photo: '/images/doc-arjun.jpg',
        qualification: 'BVSc & AH, MVSc (Diagnostic Imaging)',
        specialties: ['Diagnostic Imaging', 'Ultrasonography'],
        primarySpecialty: 'Diagnostic Imaging Specialist',
        experience: 9,
        experienceText: '9+ Years Experience',
        bio: 'Specialist in advanced diagnostic imaging including digital X-rays, ultrasound, and echocardiography.',
        languages: ['English', 'Telugu', 'Kannada'],
        availableTimings: this.generateSchedule(),
        rating: 4.8,
        reviewCount: 156,
        consultationFee: 750,
        isAvailable: true,
        isEmergencyDoctor: false,
        createdAt: new Date()
      }
    ];
  }

  private generateSchedule(): DoctorSchedule[] {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days.map(day => ({
      day,
      slots: [
        { startTime: '09:00', endTime: '13:00', isAvailable: true, maxPatients: 8, currentPatients: 3 },
        { startTime: '14:00', endTime: '17:00', isAvailable: true, maxPatients: 6, currentPatients: 2 },
        { startTime: '18:00', endTime: '20:00', isAvailable: true, maxPatients: 4, currentPatients: 1 }
      ]
    }));
  }

  // ─── Services ────────────────────────────────────────
  getServices(): VetService[] {
    return [
      {
        id: 'svc-1', name: 'General Consultation', slug: 'general-consultation',
        shortDescription: 'Comprehensive health checkup and wellness assessment for your pet.',
        description: 'Our experienced veterinarians provide thorough physical examinations, health assessments, and personalized care plans for your beloved companion animals.',
        icon: 'stethoscope', category: 'Consultation', priceRange: '₹500 – ₹1000', duration: '30 min',
        animalTypes: ['Dogs', 'Cats', 'Rabbits', 'Birds', 'Exotic Pets'], isEmergency: false, isPopular: true,
        features: ['Full physical examination', 'Health assessment', 'Diet & nutrition advice', 'Preventive care plan']
      },
      {
        id: 'svc-2', name: '24/7 Emergency Care', slug: 'emergency-care',
        shortDescription: 'Round-the-clock emergency veterinary services for critical situations.',
        description: 'Our emergency team is available 24 hours, 7 days a week to handle critical and life-threatening situations with state-of-the-art equipment and experienced specialists.',
        icon: 'alert-circle', category: 'Emergency', priceRange: '₹2000+', duration: 'As needed',
        animalTypes: ['Dogs', 'Cats', 'Rabbits', 'Birds', 'Exotic Pets'], isEmergency: true, isPopular: true,
        features: ['24/7 availability', 'Critical care unit', 'Emergency surgery', 'Trauma management']
      },
      {
        id: 'svc-3', name: 'Vaccination', slug: 'vaccination',
        shortDescription: 'Complete vaccination programs to protect your pet from diseases.',
        description: 'Comprehensive vaccination schedules tailored to your pet\'s age, breed, and lifestyle. We use only premium, internationally approved vaccines.',
        icon: 'shield', category: 'Preventive Care', priceRange: '₹500 – ₹2500', duration: '15 min',
        animalTypes: ['Dogs', 'Cats', 'Rabbits'], isEmergency: false, isPopular: true,
        features: ['Core vaccinations', 'Booster schedules', 'Vaccination certificates', 'Reminder service']
      },
      {
        id: 'svc-4', name: 'Preventive Health Checkups', slug: 'health-checkups',
        shortDescription: 'Regular health screening packages for early disease detection.',
        description: 'Comprehensive health screening packages including blood tests, imaging, and physical exams to detect potential health issues early.',
        icon: 'heart-pulse', category: 'Preventive Care', priceRange: '₹1500 – ₹5000', duration: '60 min',
        animalTypes: ['Dogs', 'Cats', 'Rabbits', 'Birds'], isEmergency: false, isPopular: false,
        features: ['Complete blood panel', 'Organ function tests', 'Imaging', 'Health report']
      },
      {
        id: 'svc-5', name: 'Dermatology', slug: 'dermatology',
        shortDescription: 'Expert treatment for skin conditions, allergies, and coat problems.',
        description: 'Specialized dermatological care for all types of skin conditions including allergies, infections, autoimmune diseases, and parasitic infestations.',
        icon: 'scan', category: 'Specialty', priceRange: '₹800 – ₹2000', duration: '30 min',
        animalTypes: ['Dogs', 'Cats', 'Rabbits'], isEmergency: false, isPopular: true,
        features: ['Skin scraping & cytology', 'Allergy testing', 'Treatment protocols', 'Coat care guidance']
      },
      {
        id: 'svc-6', name: 'Dental Care', slug: 'dental-care',
        shortDescription: 'Professional dental cleaning, extractions, and oral health services.',
        description: 'Complete dental care including professional cleaning, scaling, polishing, extractions, and treatment of periodontal disease.',
        icon: 'smile', category: 'Specialty', priceRange: '₹1000 – ₹5000', duration: '45 min',
        animalTypes: ['Dogs', 'Cats'], isEmergency: false, isPopular: false,
        features: ['Dental scaling', 'Polishing', 'Extractions', 'Oral surgery']
      },
      {
        id: 'svc-7', name: 'Surgery', slug: 'surgery',
        shortDescription: 'Advanced surgical procedures with modern equipment and expert care.',
        description: 'State-of-the-art surgical facilities for both routine and complex procedures, performed by experienced veterinary surgeons.',
        icon: 'scissors', category: 'Surgery', priceRange: '₹5000 – ₹50000', duration: 'Varies',
        animalTypes: ['Dogs', 'Cats', 'Rabbits', 'Exotic Pets'], isEmergency: false, isPopular: false,
        features: ['Advanced surgical suite', 'Anesthesia monitoring', 'Post-op care', 'Recovery unit']
      },
      {
        id: 'svc-8', name: 'Orthopaedics', slug: 'orthopaedics',
        shortDescription: 'Bone and joint treatments including fracture management and joint surgeries.',
        description: 'Specialized orthopedic care for fractures, ligament injuries, joint disorders, and mobility issues in companion animals.',
        icon: 'bone', category: 'Specialty', priceRange: '₹5000 – ₹40000', duration: 'Varies',
        animalTypes: ['Dogs', 'Cats'], isEmergency: false, isPopular: false,
        features: ['Fracture repair', 'Joint surgery', 'Rehabilitation', 'Mobility aids']
      },
      {
        id: 'svc-9', name: 'Ophthalmology', slug: 'ophthalmology',
        shortDescription: 'Comprehensive eye care and treatment for ocular conditions.',
        description: 'Expert diagnosis and treatment of eye diseases including cataracts, glaucoma, corneal ulcers, and other ocular conditions.',
        icon: 'eye', category: 'Specialty', priceRange: '₹1000 – ₹15000', duration: '30 min',
        animalTypes: ['Dogs', 'Cats', 'Rabbits', 'Birds'], isEmergency: false, isPopular: false,
        features: ['Eye examination', 'Tonometry', 'Cataract surgery', 'Corneal treatment']
      },
      {
        id: 'svc-10', name: 'Cardiology', slug: 'cardiology',
        shortDescription: 'Heart health evaluation and treatment for cardiac conditions.',
        description: 'Advanced cardiac diagnostics and treatment including ECG, echocardiography, and management of heart diseases.',
        icon: 'heart', category: 'Specialty', priceRange: '₹1500 – ₹5000', duration: '45 min',
        animalTypes: ['Dogs', 'Cats'], isEmergency: false, isPopular: false,
        features: ['ECG', 'Echocardiography', 'Cardiac management', 'Follow-up care']
      },
      {
        id: 'svc-11', name: 'Neurology', slug: 'neurology',
        shortDescription: 'Diagnosis and treatment of nervous system disorders.',
        description: 'Specialized neurological assessment and treatment for seizures, spinal disorders, nerve injuries, and other neurological conditions.',
        icon: 'brain', category: 'Specialty', priceRange: '₹2000 – ₹10000', duration: '45 min',
        animalTypes: ['Dogs', 'Cats'], isEmergency: false, isPopular: false,
        features: ['Neurological exam', 'Seizure management', 'Spinal assessment', 'Rehabilitation']
      },
      {
        id: 'svc-12', name: 'Diagnostic Lab', slug: 'diagnostic-lab',
        shortDescription: 'In-house laboratory for fast and accurate diagnostic testing.',
        description: 'Complete in-house diagnostic laboratory providing blood work, urinalysis, cytology, histopathology, and microbiology testing.',
        icon: 'flask', category: 'Diagnostics', priceRange: '₹500 – ₹5000', duration: '15-60 min',
        animalTypes: ['Dogs', 'Cats', 'Rabbits', 'Birds', 'Exotic Pets'], isEmergency: false, isPopular: true,
        features: ['Blood panels', 'Urinalysis', 'Cytology', 'Rapid results']
      },
      {
        id: 'svc-13', name: 'X-Ray / Ultrasound', slug: 'imaging',
        shortDescription: 'Advanced imaging services for accurate diagnosis.',
        description: 'Digital radiography and ultrasonography services for comprehensive internal imaging to aid in accurate diagnosis.',
        icon: 'image', category: 'Diagnostics', priceRange: '₹1000 – ₹3000', duration: '20 min',
        animalTypes: ['Dogs', 'Cats', 'Rabbits', 'Birds', 'Exotic Pets'], isEmergency: false, isPopular: false,
        features: ['Digital X-ray', 'Ultrasound', 'Echocardiography', 'Image storage']
      },
      {
        id: 'svc-14', name: 'Pharmacy', slug: 'pharmacy',
        shortDescription: 'In-house pharmacy with genuine veterinary medicines and supplements.',
        description: 'Fully stocked in-house pharmacy providing genuine, quality-assured veterinary medications, supplements, and dietary products.',
        icon: 'pill', category: 'Wellness', priceRange: 'Varies', duration: 'N/A',
        animalTypes: ['Dogs', 'Cats', 'Rabbits', 'Birds', 'Exotic Pets'], isEmergency: false, isPopular: true,
        features: ['Genuine medicines', 'Prescription filling', 'Supplements', 'Home delivery']
      },
      {
        id: 'svc-15', name: 'Pet Grooming', slug: 'grooming',
        shortDescription: 'Professional grooming services to keep your pet looking and feeling great.',
        description: 'Premium grooming services including bath, haircut, nail trimming, ear cleaning, and specialized coat care treatments.',
        icon: 'sparkles', category: 'Grooming', priceRange: '₹500 – ₹3000', duration: '60-120 min',
        animalTypes: ['Dogs', 'Cats'], isEmergency: false, isPopular: true,
        features: ['Full bath & dry', 'Breed-specific cuts', 'Nail trimming', 'De-shedding']
      },
      {
        id: 'svc-16', name: 'Deworming', slug: 'deworming',
        shortDescription: 'Regular deworming to protect your pet from parasites.',
        description: 'Scheduled deworming programs to eliminate internal parasites and maintain your pet\'s gastrointestinal health.',
        icon: 'bug', category: 'Preventive Care', priceRange: '₹200 – ₹800', duration: '10 min',
        animalTypes: ['Dogs', 'Cats', 'Rabbits'], isEmergency: false, isPopular: false,
        features: ['Internal parasite control', 'Scheduled programs', 'Safe medications', 'Follow-up']
      },
      {
        id: 'svc-17', name: 'Nutrition Consultation', slug: 'nutrition',
        shortDescription: 'Expert dietary planning and nutrition advice for your pet.',
        description: 'Personalized nutrition counseling based on your pet\'s age, breed, weight, and health conditions, with customized diet plans.',
        icon: 'apple', category: 'Wellness', priceRange: '₹500 – ₹1000', duration: '30 min',
        animalTypes: ['Dogs', 'Cats', 'Rabbits', 'Birds'], isEmergency: false, isPopular: false,
        features: ['Diet assessment', 'Custom meal plans', 'Weight management', 'Supplement advice']
      },
      {
        id: 'svc-18', name: 'Puppy & Kitten Care', slug: 'puppy-kitten-care',
        shortDescription: 'Specialized care programs for puppies and kittens.',
        description: 'Comprehensive care packages for young animals including vaccinations, deworming, nutrition guidance, and socialization advice.',
        icon: 'baby', category: 'Wellness', priceRange: '₹1000 – ₹3000', duration: '45 min',
        animalTypes: ['Dogs', 'Cats'], isEmergency: false, isPopular: true,
        features: ['Puppy packages', 'Kitten packages', 'Growth monitoring', 'Behavioral guidance']
      },
      {
        id: 'svc-19', name: 'Senior Pet Care', slug: 'senior-pet-care',
        shortDescription: 'Geriatric care and health management for aging pets.',
        description: 'Specialized geriatric care programs including regular health screenings, joint care, dental care, and chronic disease management.',
        icon: 'clock', category: 'Wellness', priceRange: '₹1500 – ₹5000', duration: '45 min',
        animalTypes: ['Dogs', 'Cats'], isEmergency: false, isPopular: false,
        features: ['Geriatric screening', 'Pain management', 'Mobility support', 'Chronic care']
      }
    ];
  }

  // ─── Grooming Packages ───────────────────────────────
  getGroomingPackages(): GroomingPackage[] {
    return [
      {
        id: 'grm-1', name: 'Bath & Blow Dry', description: 'Complete bath with premium shampoo, conditioner, and professional blow drying.',
        icon: 'droplets', price: 599, originalPrice: 799, duration: '45 min',
        includes: ['Premium shampoo wash', 'Conditioner treatment', 'Blow dry & brushing', 'Cologne spray'],
        petTypes: ['Dogs', 'Cats'], isPopular: false
      },
      {
        id: 'grm-2', name: 'Haircut & Styling', description: 'Breed-specific or custom haircut with professional styling and finishing.',
        icon: 'scissors', price: 899, originalPrice: 1199, duration: '60 min',
        includes: ['Breed-specific cut', 'Face trimming', 'Paw trimming', 'Sanitary trim'],
        petTypes: ['Dogs', 'Cats'], isPopular: false
      },
      {
        id: 'grm-3', name: 'Nail Trimming', description: 'Professional nail clipping and filing for comfortable paws.',
        icon: 'edit-3', price: 199, duration: '15 min',
        includes: ['Nail clipping', 'Filing & smoothing', 'Paw pad check'],
        petTypes: ['Dogs', 'Cats', 'Rabbits'], isPopular: false
      },
      {
        id: 'grm-4', name: 'Ear Cleaning', description: 'Thorough ear cleaning to prevent infections and maintain hygiene.',
        icon: 'volume-2', price: 249, duration: '15 min',
        includes: ['Ear inspection', 'Gentle cleaning', 'Ear drying', 'Health check'],
        petTypes: ['Dogs', 'Cats'], isPopular: false
      },
      {
        id: 'grm-5', name: 'Paw Care', description: 'Complete paw care including nail trim, pad moisturizing, and fur trimming.',
        icon: 'hand', price: 349, duration: '20 min',
        includes: ['Nail trimming', 'Pad moisturizing', 'Inter-digital cleaning', 'Fur trimming'],
        petTypes: ['Dogs', 'Cats'], isPopular: false
      },
      {
        id: 'grm-6', name: 'Full Grooming Package', description: 'The ultimate grooming experience — bath, haircut, nails, ears, and more!',
        icon: 'sparkles', price: 1499, originalPrice: 2199, duration: '120 min',
        includes: ['Full bath & dry', 'Haircut & styling', 'Nail trimming', 'Ear cleaning', 'Teeth brushing', 'Cologne', 'Bow/Bandana'],
        petTypes: ['Dogs', 'Cats'], isPopular: true
      }
    ];
  }

  // ─── Products ────────────────────────────────────────
  getProducts(): Product[] {
    return [
      {
        id: 'prd-1', name: 'Royal Canin Adult Dog Food', slug: 'royal-canin-adult-dog-food',
        description: 'Complete and balanced nutrition for adult dogs aged 1-7 years with active protein formula.',
        shortDescription: 'Dog Food (15kg)', category: 'Pet Food', subCategory: 'Dog Food',
        brand: 'Royal Canin', images: ['/images/prod-royal-canin.jpg'], price: 3499, originalPrice: 3999, discount: 12,
        currency: '₹', stock: 45, isInStock: true, sku: 'RC-AD-15KG', weight: '15kg',
        rating: 4.8, reviewCount: 234, tags: ['dog food', 'adult', 'premium'], petType: ['Dogs'],
        isFeatured: true, isNewArrival: false, isBestSeller: true, createdAt: new Date()
      },
      {
        id: 'prd-2', name: 'Whiskas Adult Cat Food – Tuna & Salmon', slug: 'whiskas-adult-cat-food-tuna',
        description: 'Delicious tuna flavored cat food with essential nutrients and omega oils for adult cats.',
        shortDescription: 'Cat Food (7kg)', category: 'Pet Food', subCategory: 'Cat Food',
        brand: 'Whiskas', images: ['/images/prod-whiskas.jpg'], price: 1299, originalPrice: 1499, discount: 13,
        currency: '₹', stock: 60, isInStock: true, sku: 'WH-CT-7KG', weight: '7kg',
        rating: 4.7, reviewCount: 178, tags: ['cat food', 'tuna', 'adult'], petType: ['Cats'],
        isFeatured: true, isNewArrival: false, isBestSeller: true, createdAt: new Date()
      },
      {
        id: 'prd-3', name: 'Flea & Tick Treatment Drops (Spot On)', slug: 'flea-tick-drops',
        description: 'Fast acting veterinary formula for complete elimination and prevention of ticks, fleas, and mites.',
        shortDescription: 'Flea & Tick Drops', category: 'Hygiene Products', subCategory: 'Flea & Tick Control',
        brand: 'Bayer / Frontline', images: ['/images/prod-flea-tick.jpg'], price: 599, originalPrice: 699, discount: 14,
        currency: '₹', stock: 80, isInStock: true, sku: 'FT-DRP-100ML', weight: '100ml',
        rating: 4.9, reviewCount: 312, tags: ['tick drops', 'flea control', 'healthcare'], petType: ['Dogs', 'Cats'],
        isFeatured: true, isNewArrival: false, isBestSeller: true, createdAt: new Date()
      },
      {
        id: 'prd-4', name: 'Kong Classic Extreme Chew Dog Toy', slug: 'kong-classic-dog-toy',
        description: 'Ultra-durable rubber toy perfect for stuffing with treats. Ideal for energetic dogs.',
        shortDescription: 'Durable Rubber Toy', category: 'Toys', subCategory: 'Chew Toys',
        brand: 'Kong', images: ['/images/prod-kong.jpg'], price: 699, originalPrice: 850, discount: 18,
        currency: '₹', stock: 35, isInStock: true, sku: 'KG-CL-M', weight: '200g',
        rating: 4.8, reviewCount: 156, tags: ['toy', 'rubber', 'chew toy', 'dog'], petType: ['Dogs'],
        isFeatured: true, isNewArrival: false, isBestSeller: false, createdAt: new Date()
      },
      {
        id: 'prd-5', name: 'Premium Orthopedic Memory Foam Bed', slug: 'premium-orthopedic-dog-bed',
        description: 'Memory foam orthopedic bed with water-resistant removable washable cover.',
        shortDescription: 'Memory Foam Bed (Large)', category: 'Beds', subCategory: 'Orthopedic',
        brand: 'PetComfort', images: ['/images/prod-bed.jpg'], price: 2499, originalPrice: 3499, discount: 28,
        currency: '₹', stock: 15, isInStock: true, sku: 'PC-OB-L', dimensions: '90x70x12cm',
        rating: 4.9, reviewCount: 89, tags: ['bed', 'orthopedic', 'memory foam'], petType: ['Dogs'],
        isFeatured: true, isNewArrival: true, isBestSeller: false, createdAt: new Date()
      },
      {
        id: 'prd-6', name: 'Drools 100% Real Chicken Dog Treats', slug: 'drools-chicken-treats',
        description: 'Real chicken jerky strips — high protein, natural and irresistible flavor for dogs.',
        shortDescription: 'Real Chicken Jerky (300g)', category: 'Treats', subCategory: 'Jerky',
        brand: 'Drools', images: ['/images/prod-treats.jpg'], price: 349, originalPrice: 450, discount: 22,
        currency: '₹', stock: 100, isInStock: true, sku: 'DR-CK-300G', weight: '300g',
        rating: 4.6, reviewCount: 445, tags: ['treats', 'chicken', 'jerky', 'dog'], petType: ['Dogs'],
        isFeatured: false, isNewArrival: false, isBestSeller: true, createdAt: new Date()
      }
    ];
  }

  // ─── Testimonials ────────────────────────────────────
  getTestimonials() {
    return [
      {
        id: 'test-1', name: 'Sneha Reddy', petName: 'Bruno', petType: 'Dog Parent • Bruno',
        rating: 5, text: 'SuperVet saved my dog’s life during an emergency. The team was so professional and caring. Highly recommend!',
        avatar: '/images/avatar-sneha.jpg', date: new Date('2024-08-15')
      },
      {
        id: 'test-2', name: 'Rahul Verma', petName: 'Snowy', petType: 'Pet Parent • Snowy',
        rating: 5, text: 'Excellent service and very friendly staff. My cat feels comfortable every time we visit. Thank you SuperVet!',
        avatar: '/images/avatar-rahul.jpg', date: new Date('2024-09-01')
      },
      {
        id: 'test-3', name: 'Anitha Rao', petName: 'Milo', petType: 'Pet Parent • Milo',
        rating: 5, text: 'The grooming service is amazing! My dog comes back looking and feeling great. Love this place!',
        avatar: '/images/avatar-anitha.jpg', date: new Date('2024-09-10')
      }
    ];
  }

  // ─── Stats ───────────────────────────────────────────
  getStats() {
    return [
      { number: 15, suffix: '+', label: 'Expert Doctors', icon: 'users' },
      { number: 10000, suffix: '+', label: 'Happy Pets', icon: 'heart' },
      { number: 24, suffix: '/7', label: 'Emergency Care', icon: 'clock' },
      { number: 50, suffix: '+', label: 'Services', icon: 'grid' }
    ];
  }

  // ─── FAQ ─────────────────────────────────────────────
  getFAQs() {
    return [
      { question: 'What are your working hours?', answer: 'SuperVet is open 24/7 for emergency cases. Regular consultations are available from 9:00 AM to 8:00 PM, Monday through Saturday. Sunday consultations are by appointment only.', isOpen: false },
      { question: 'Which animals do you treat?', answer: 'We specialize in non-ruminant companion animals including Dogs, Cats, Rabbits, Birds, and other exotic pets. Please call ahead for exotic pet appointments so we can ensure the right specialist is available.', isOpen: false },
      { question: 'How do I book an appointment?', answer: 'You can book an appointment through our website, mobile app, or by calling us directly. Online booking allows you to choose your preferred doctor, date, and time slot.', isOpen: false },
      { question: 'Do you offer emergency services?', answer: 'Yes! Our emergency care unit operates 24/7 with experienced emergency veterinarians and fully equipped facilities. Call our emergency hotline for immediate assistance.', isOpen: false },
      { question: 'What payment methods do you accept?', answer: 'We accept cash, credit/debit cards, UPI (GPay, PhonePe, Paytm), net banking, and EMI options for larger treatments. Insurance claims are also processed.', isOpen: false },
      { question: 'Can I get my pet\'s medical records online?', answer: 'Yes! All medical records, vaccination history, prescriptions, and test reports are available through your SuperVet dashboard on our website and mobile app.', isOpen: false },
      { question: 'Do you offer home delivery for pet products?', answer: 'Yes, our pet store offers home delivery across the city. Orders above ₹499 qualify for free delivery. Same-day delivery is available for select areas.', isOpen: false },
      { question: 'What grooming services do you offer?', answer: 'We offer bath & blow dry, haircut & styling, nail trimming, ear cleaning, paw care, and full grooming packages. All services use premium, pet-safe products.', isOpen: false }
    ];
  }
}
