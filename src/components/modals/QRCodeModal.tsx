
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, QrCode } from 'lucide-react';
import { generateQRCode, downloadQRCode } from '@/utils/qrCodeGenerator';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    image?: string;
  };
}

const QRCodeModal = ({ isOpen, onClose, product }: QRCodeModalProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && product) {
      generateQRCode(`Product ID: ${product.id}\nName: ${product.name}`)
        .then(setQrCodeUrl)
        .catch(console.error);
    }
  }, [isOpen, product]);

  const handleDownload = () => {
    if (qrCodeUrl) {
      downloadQRCode(qrCodeUrl, `${product.name}-QR.png`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <QrCode className="w-5 h-5 mr-2 text-blue-600" />
            Product QR Code
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-3"
                />
              )}
              <h3 className="font-semibold text-slate-800">{product.name}</h3>
              <p className="text-sm text-slate-600">ID: {product.id}</p>
            </div>
          </div>
          
          {qrCodeUrl && (
            <div className="text-center">
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="mx-auto border-2 border-slate-200 rounded-lg"
              />
            </div>
          )}
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button 
              onClick={handleDownload} 
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700"
              disabled={!qrCodeUrl}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
