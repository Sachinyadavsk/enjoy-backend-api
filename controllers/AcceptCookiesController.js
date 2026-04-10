import AcceptCookiesModel from "../models/AcceptCookiesModel.js";

export const create = async (req, res) => {
    try {
        const data = new AcceptCookiesModel({
            ip: req.body.ip || req.ip,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            postal: req.body.postal,
            loc: req.body.loc,
            isp: req.body.isp,
            device: req.body.device,
            os: req.body.os,
            user_agent: req.headers['user-agent'],
            date_time: new Date().toISOString()
        });

        const result = await data.save();

        res.json({
            status: true,
            message: 'Cookie data saved',
            data: result
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Insert failed',
            error
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const data = await AcceptCookiesModel.find().sort({ _id: -1 });

        res.json({
            status: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Fetch failed',
            error
        });
    }
};