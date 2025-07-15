import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { CollegeUpdate } from '@/src/types/firebase';

export class CollegeUpdateService {
  // Create college update (admin only)
  static async createUpdate(updateData: Omit<CollegeUpdate, 'id' | 'createdAt'>) {
    try {
      const updateRef = doc(collection(db, 'collegeUpdates'));
      const update: CollegeUpdate = {
        ...updateData,
        id: updateRef.id,
        createdAt: Timestamp.now()
      };

      await setDoc(updateRef, update);
      return { success: true, update };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get all college updates
  static async getCollegeUpdates(limitCount: number = 20) {
    try {
      const updatesRef = collection(db, 'collegeUpdates');
      const q = query(
        updatesRef,
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const updates: CollegeUpdate[] = [];
      
      querySnapshot.forEach((doc) => {
        updates.push(doc.data() as CollegeUpdate);
      });

      return { success: true, updates };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Add some sample college updates
  static async addSampleUpdates() {
    const sampleUpdates = [
      {
        title: "Tech Fest 2025 Registration Open",
        description: "Annual technical festival with coding competitions, hackathons, and tech talks. Register before March 1st.",
        type: "event" as const,
        date: Timestamp.fromDate(new Date('2025-03-15')),
        deadline: Timestamp.fromDate(new Date('2025-03-01')),
        priority: "high" as const,
        createdBy: "admin"
      },
      {
        title: "Machine Learning Workshop",
        description: "Hands-on workshop covering ML fundamentals, supervised learning, and practical implementation using Python.",
        type: "workshop" as const,
        date: Timestamp.fromDate(new Date('2025-02-20')),
        priority: "medium" as const,
        createdBy: "admin"
      },
      {
        title: "Google Summer of Code Info Session",
        description: "Learn about GSoC application process, project selection, and tips from previous participants.",
        type: "event" as const,
        date: Timestamp.fromDate(new Date('2025-02-10')),
        priority: "high" as const,
        createdBy: "admin"
      }
    ];

    try {
      for (const update of sampleUpdates) {
        await this.createUpdate(update);
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}