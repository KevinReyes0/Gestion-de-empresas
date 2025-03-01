import CompaniesAdd from '../companiesAdd/companiesAdd.model.js';

import Companies from '../companies/companies.model.js'

export const addCompanies = async (req, res) => {
    try {

        const data = req.body;
        const companies = await Companies.findOne({nameCompany: data.nameCompany});

        if(!companies){
            return res.status(404).json({
                success: false,
                message: "Company not found",
            })
        }

        const companyAdd = await CompaniesAdd.create({
            keeperCompany: companies._id
        })

        return res.status(201).json({
            message: "Company registered successfully",
            CompanyDetails: {
                Company: await companyAdd.populate('keeperCompany', 'nameCompany')
            }
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error adding company",
            error: error.message
        })
    }
}