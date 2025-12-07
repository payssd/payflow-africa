import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, AlertCircle, Download } from "lucide-react";

export default function HRCSVUpload() {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = () => {
    setUploadState("uploading");
    setTimeout(() => setUploadState("success"), 2000);
  };

  return (
    <DashboardLayout title="CSV Upload" role="hr">
      <div className="space-y-6 max-w-3xl">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Bulk Employee Import</h2>
          <p className="text-muted-foreground">Upload a CSV file to add multiple employees at once</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
            dragActive ? "border-purple-500 bg-purple-500/10" : "border-border/50 bg-card/30"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); handleUpload(); }}
        >
          {uploadState === "idle" && (
            <>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Drop your CSV file here</h3>
              <p className="text-muted-foreground mb-6">or click to browse from your computer</p>
              <Button onClick={handleUpload} data-testid="button-select-file">Select File</Button>
            </>
          )}

          {uploadState === "uploading" && (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin mx-auto" />
              <p className="text-foreground font-medium">Processing your file...</p>
            </div>
          )}

          {uploadState === "success" && (
            <>
              <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Upload Successful!</h3>
              <p className="text-muted-foreground mb-4">45 employees imported, 2 duplicates skipped</p>
              <Button variant="outline" onClick={() => setUploadState("idle")}>Upload Another</Button>
            </>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl bg-card/50 border border-border/50 p-6">
          <h3 className="font-semibold text-foreground mb-4">CSV Format Requirements</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Required Columns</p>
                <p className="text-muted-foreground">first_name, last_name, email, department, position, salary</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Important Notes</p>
                <p className="text-muted-foreground">Emails must be unique. Salary should be in numeric format without currency symbols.</p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="mt-4 gap-2" data-testid="button-download-template">
            <Download className="w-4 h-4" />
            Download Template
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
