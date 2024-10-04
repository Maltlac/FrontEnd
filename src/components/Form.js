import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { validateEmail, validatePostalCode, validateName } from '../utils/validations';

const Form = ({ addUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    city: '',
    postalCode: ''
  });

  const [users, setUsers] = useState([]);  // Pour stocker la liste des utilisateurs
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);  // État pour gérer la validité globale du formulaire

  // Fonction pour récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);  // Requête GET pour récupérer les utilisateurs
      setUsers(response.data);  // Mise à jour de l'état avec les utilisateurs
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
  };

  // Utiliser useEffect pour récupérer les utilisateurs lorsque le composant est monté
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour vérifier si tous les champs sont valides
  const validateForm = () => {
    let validationErrors = {};

    if (!validateName(formData.firstName)) validationErrors.firstName = 'Prénom invalide';
    if (!validateName(formData.lastName)) validationErrors.lastName = 'Nom invalide';
    if (!validateEmail(formData.email)) validationErrors.email = 'Email invalide';
    if (!validatePostalCode(formData.postalCode)) validationErrors.postalCode = 'Code postal invalide';
    
    const birthDate = new Date(formData.birthDate);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 18) validationErrors.birthDate = 'L’utilisateur doit avoir plus de 18 ans';

    setErrors(validationErrors);

    // Vérifie si tous les champs sont remplis et valides
    return Object.keys(validationErrors).length === 0;
  };

  // Utilise un effet pour réévaluer la validité du formulaire à chaque changement de champ
  useEffect(() => {
    setIsFormValid(validateForm());  // Met à jour la validité du formulaire
  }, [formData]);

  // Gestionnaire de modification des champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, formData);
        addUser(response.data);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          birthDate: '',
          city: '',
          postalCode: ''
        });
        setErrors({});
        fetchUsers();  // Actualiser la liste des utilisateurs après avoir ajouté un utilisateur
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span>{errors.firstName}</span>}
        
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span>{errors.lastName}</span>}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
        
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
        {errors.birthDate && <span>{errors.birthDate}</span>}
        
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={formData.city}
          onChange={handleChange}
        />
        
        <input
          type="text"
          name="postalCode"
          placeholder="Code Postal"
          value={formData.postalCode}
          onChange={handleChange}
        />
        {errors.postalCode && <span>{errors.postalCode}</span>}
        
        <button type="submit" disabled={!isFormValid}>
          Sauvegarder
        </button>
      </form>

      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName} - {user.email} - {user.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
