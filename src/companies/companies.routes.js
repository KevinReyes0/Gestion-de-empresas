import {Router} from "express";
import {check} from "express-validator";
import {validarCampos} from '../middlewares/validar-campos.js';
import {existeCompany, existeCompanyById} from '../helpers/db.validator.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

import xl from 'excel4node';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Companies from './companies.model.js';

import { registerCompanies, updateCompany, companiesView } from './companies.controller.js';

const router = Router();


router.post(
    "/registerCompany/",
    [
        check("nameCompany").custom(existeCompany),
        validarCampos
    ],
    registerCompanies
)

router.put(
    "/updateCompany/:id",
    [
        validarJWT,
        check("id", "Invalid id").isMongoId(),
        check("id").custom(existeCompanyById),
        check("nameCompany").custom(existeCompany),
        validarCampos
    ],
    updateCompany
)

router.get("/",companiesView);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/excel', async (req, res) => {
    try {
        const companies = await Companies.find({ state: true });

        if (!companies.length) {
            return res.status(404).json({ msg: 'No companies found' });
        };

        const wb = new xl.Workbook();
        const ws = wb.addWorksheet('Companies');

        var greenStyle = wb.createStyle({
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#b2e664'
            }
        });

        const headers = ['Name', 'Impact', 'Years Experience', 'Category'];
        headers.forEach((header, index) => ws.cell(1, index + 1).string(header).style(greenStyle));

        ws.column(1).setWidth(10);
        ws.column(2).setWidth(10);
        ws.column(3).setWidth(20);
        ws.column(4).setWidth(25);

        companies.forEach((company, rowIndex) => {
            ws.cell(rowIndex + 2, 1).string(company.nameCompany);
            ws.cell(rowIndex + 2, 2).string(company.impact);
            ws.cell(rowIndex + 2, 3).number(company.yearsOfExperience);
            ws.cell(rowIndex + 2, 4).string(company.companyCategory);
        });

        const pathExcel = path.join(__dirname, 'excel', 'Companies.xlsx');

        wb.write(pathExcel, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Error creating Excel file' });
            }
            res.download(pathExcel);
        });

    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ msg: 'Internal server error' });
    };
});


export default router;