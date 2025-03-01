import { response } from "express";

import Companies from '../companies/companies.model.js';

export const registerCompanies = async (req, res) => {
    try {
        const data = req.body;

        const company = await Companies.create({
            nameCompany: data.nameCompany,
            impact: data.impact,
            yearsOfExperience: data.yearsOfExperience,
            companyCategory: data.companyCategory
        })

        return res.status(201).json({
            message: "Company registered successfully",
            CompanyDetails: {
                Company: company.nameCompany
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error register company",
            error: error.message
        })
    }
}

export const updateCompany = async (req, res  = response) => {
    try {
        const {id} = req.params;
        const {_id, ...data} = req.body; 

        const company = await Companies.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            succes: true,
            msj: 'Company updated successfully',
            company
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msj: 'Error updating Company',
            error: error.message
        })
    }
}

export const companiesView = async (req, res) => {
    const {limite = 10, desde = 0, companyCategory, ordenAZoZA = 'a-z', ordenYears = 'mayorMenor', buscarPor = 'nameCompany'} = req.query;
    const query = {state: true};


    if (companyCategory){
        query.companyCategory = {$regex: new RegExp(companyCategory, 'i')}
    }

    try {
        const buscarCriterio = {};

        if (buscarPor === 'yearsOfExperience') {
            console.log('Valor de ordenYears:', ordenYears);
            buscarCriterio.yearsOfExperience = ordenYears === 'menorMayor' ? 1 : -1;
        } else {
            console.log('Valor de ordenYears:', ordenYears);
            buscarCriterio[buscarPor] = ordenAZoZA.toLowerCase() === 'z-a' ? -1 : 1;
        }

        console.log('Criterio de ordenación:', buscarCriterio);

        const companies = await Companies.find(query)
            .collation({ locale: 'es', strength: 2 })
            .sort(buscarCriterio)
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Companies.countDocuments(query);

        res.status(200).json({
            succes: true,
            total,
            companies
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error getting companies',
            error: error.message
        })
    }
} 