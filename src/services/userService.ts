import type { User } from "../types";
import { mockUsers } from "../data/mockData";

/**
 * Service pour récupérer les informations des utilisateurs
 */
export class UserService {
  /**
   * Récupère un utilisateur par son ID
   */
  static getUserById(id: string): User | null {
    return mockUsers.find(user => user.id === id) || null;
  }

  /**
   * Récupère le nom complet d'un utilisateur
   */
  static getUserFullName(id: string): string {
    const user = this.getUserById(id);
    if (!user) return `Auteur ${id}`;

    return `${user.firstName} ${user.lastName}`;
  }

  /**
   * Récupère les initiales d'un utilisateur
   */
  static getUserInitials(id: string): string {
    const user = this.getUserById(id);
    if (!user) return id.slice(0, 2).toUpperCase();

    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }

  /**
   * Récupère tous les utilisateurs
   */
  static getAllUsers(): User[] {
    return mockUsers;
  }
}
