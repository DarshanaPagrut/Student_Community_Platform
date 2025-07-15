import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { Group } from "@/src/types/firebase";

export class GroupService {
  // Create new group
  static async createGroup(
    groupData: Omit<Group, "id" | "createdAt" | "updatedAt">
  ) {
    try {
      const groupRef = doc(collection(db, "groups"));
      const group: Group = {
        ...groupData,
        id: groupRef.id,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await setDoc(groupRef, group);
      return { success: true, group };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  } // Get all groups

  static async getAllGroups() {
    try {
      const groupsRef = collection(db, "groups");
      const q = query(groupsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const groups: Group[] = [];
      querySnapshot.forEach((doc) => {
        groups.push(doc.data() as Group);
      });

      return { success: true, groups };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  } // Search groups by language or goal

  static async searchGroups(searchTerm: string) {
    try {
      const groupsRef = collection(db, "groups");
      const q = query(
        groupsRef,
        where("language", ">=", searchTerm),
        where("language", "<=", searchTerm + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);
      const groups: Group[] = [];
      querySnapshot.forEach((doc) => {
        groups.push(doc.data() as Group);
      });

      return { success: true, groups };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  } // Join group

  static async joinGroup(groupId: string, userId: string) {
    try {
      const groupRef = doc(db, "groups", groupId);
      const userRef = doc(db, "users", userId); // Get current members to calculate count

      const groupSnap = await getDoc(groupRef);
      if (!groupSnap.exists()) {
        return { success: false, error: "Group not found" };
      }

      const groupData = groupSnap.data() as Group;
      const currentMembers = groupData.members || [];
      const updatedMembers = Array.from(new Set([...currentMembers, userId]));

      await updateDoc(groupRef, {
        members: arrayUnion(userId),
        memberCount: updatedMembers.length,
        updatedAt: Timestamp.now(),
      });

      await updateDoc(userRef, {
        groupId: groupId,
        updatedAt: Timestamp.now(),
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  } // Leave group

  static async leaveGroup(groupId: string, userId: string) {
    try {
      const groupRef = doc(db, "groups", groupId);
      const userRef = doc(db, "users", userId);

      const groupSnap = await getDoc(groupRef);
      if (!groupSnap.exists()) {
        return { success: false, error: "Group not found" };
      }

      const groupData = groupSnap.data() as Group;
      const currentMembers = groupData.members || [];
      const updatedMembers = currentMembers.filter(
        (member: string) => member !== userId
      );

      await updateDoc(groupRef, {
        members: arrayRemove(userId),
        memberCount: updatedMembers.length,
        updatedAt: Timestamp.now(),
      });

      await updateDoc(userRef, {
        groupId: null,
        updatedAt: Timestamp.now(),
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  } // Get group by ID

  static async getGroupById(groupId: string) {
    try {
      const groupDoc = await getDoc(doc(db, "groups", groupId));
      if (groupDoc.exists()) {
        return { success: true, group: groupDoc.data() as Group };
      } else {
        return { success: false, error: "Group not found" };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  } // Get group members

  static async getGroupMembers(groupId: string) {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("groupId", "==", groupId));
      const querySnapshot = await getDocs(q);

      const members: any[] = [];
      querySnapshot.forEach((doc) => {
        members.push(doc.data());
      });

      return { success: true, members };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
