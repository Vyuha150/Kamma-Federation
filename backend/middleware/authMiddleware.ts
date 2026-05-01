import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const requireSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'superadmin') {
        return res.status(403).json({ message: 'Super admin privileges required' });
    }
    next();
};
