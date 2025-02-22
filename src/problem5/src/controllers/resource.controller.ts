import { Request, Response } from "express";

import { ResourceModel } from "../models";

// Create a resource
export const createResource = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const resource = new ResourceModel({ name, description });
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: "Error creating resource", error });
  }
};

// List resources with filters
export const getResources = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const query: any = {};
    if (name) query.name = { $regex: name, $options: "i" };

    const resources = await ResourceModel.find(query);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resources", error });
  }
};

// Get resource details
export const getResourceById = async (req: Request, res: Response) => {
  try {
    const resource = await ResourceModel.findById(req.params.id);
    if (!resource)
      return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resource", error });
  }
};

// Update resource
export const updateResource = async (req: Request, res: Response) => {
  try {
    const updatedResource = await ResourceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedResource)
      return res.status(404).json({ message: "Resource not found" });
    res.json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: "Error updating resource", error });
  }
};

// Delete resource
export const deleteResource = async (req: Request, res: Response) => {
  try {
    const deletedResource = await ResourceModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedResource)
      return res.status(404).json({ message: "Resource not found" });
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resource", error });
  }
};
