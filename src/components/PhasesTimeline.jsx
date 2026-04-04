import React, { useEffect, useRef, useState } from 'react';

const steps = [
    {
        id: 1,
        title: 'Edge Data Collection',
        desc: 'Hikers and rangers capture high-resolution imagery of forest fuel loads. The app processes this locally, extracting crucial metadata and running initial quality checks before securely encrypting the payload for transit.',
        tags: ['Image Capture', 'Metadata Extraction', 'Quality Check', 'Encryption'],
        icon: '📱',
        color: '#4CAF50'
    },
    {
        id: 2,
        title: 'Store-and-Forward Routing',
        desc: 'Designed for off-grid environments, the system detects connection states. Data is queued in a local database and batch-synchronized the moment an internet connection is established, clearing the cache to save storage.',
        tags: ['State Detection', 'Database Queuing', 'Batch Sync', 'Cache Clearing'],
        icon: '💾',
        color: '#1976D2'
    },
    {
        id: 3,
        title: 'Cloud Ingestion & Pre-processing',
        desc: 'Encrypted payloads are received by the AWS API Gateway. Images are pushed to Blob Storage while metadata is logged into the database, triggering serverless events for the next pipeline stage.',
        tags: ['API Gateway', 'Blob Storage', 'DB Logging', 'Event Triggers'],
        icon: '☁️',
        color: '#9E9E9E'
    },
    {
        id: 4,
        title: 'AI/ML Inference Pipeline',
        desc: 'Images are normalized and passed through a dual-model architecture. U-Net performs semantic segmentation on the imagery, while ResNet-50 classifies the fuel type, outputting a definitive Confidence Score.',
        tags: ['Image Normalization', 'Segmentation', 'Classification', 'Confidence Scoring'],
        icon: '🧠',
        color: '#FF9800'
    },
    {
        id: 5,
        title: 'Geospatial Fusion & Alerting',
        desc: 'AI classifications are aggregated and fused with external APIs. A localized Risk Index is calculated to update live maps, which then synchronizes via app refresh and pushes critical alerts.',
        tags: ['Aggregation', 'Risk Index', 'Map Updating', 'Alerts'],
        icon: '🗺️',
        color: '#9C27B0'
    }
];

export default function PhasesTimeline({ theme }) {
    const containerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const start = rect.top - windowHeight / 2;
            const max = rect.height;

            let progress = -start / max;
            progress = Math.max(0, Math.min(1, progress));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative max-w-6xl mx-auto py-12" ref={containerRef}>

            {/* Background Line */}
            <div className={`absolute left-[39px] md:left-1/2 top-0 bottom-12 w-[4px] transform md:-translate-x-1/2 overflow-hidden rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                {/* Dynamic Scroll Fill Line */}
                <div
                    className="absolute top-0 w-full bg-[#FF4500] transition-all duration-100 ease-out rounded-full"
                    style={{
                        height: `${scrollProgress * 100}%`,
                        boxShadow: '0 0 15px #FF4500, 0 0 5px #FF4500'
                    }}
                />
            </div>

            <div className="space-y-16 md:space-y-32">
                {steps.map((item, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div key={item.id} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                            <div className="hidden md:block w-[calc(50%-5rem)]"></div>

                            {/* Enlarged Node */}
                            <div className={`absolute left-[8px] md:left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-16 h-16 rounded-full border-[4px] flex items-center justify-center text-3xl z-10 transition-transform hover:scale-110 shadow-lg`}
                                style={{
                                    borderColor: scrollProgress >= (index / (steps.length - 1)) - 0.1 ? '#FF4500' : item.color,
                                    backgroundColor: theme === 'dark' ? '#050505' : '#ffffff',
                                    transition: 'border-color 0.3s ease'
                                }}>
                                {item.icon}
                                <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md`}
                                    style={{ backgroundColor: scrollProgress >= (index / (steps.length - 1)) - 0.1 ? '#FF4500' : item.color }}>
                                    {item.id}
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className={`w-full md:w-[calc(50%-5rem)] pl-24 md:pl-0 z-0`}>
                                <div className={`p-8 md:p-10 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${theme === 'dark' ? 'bg-[#0a0a0c]/90 backdrop-blur-md border-gray-800/60' : 'bg-white/90 backdrop-blur-md border-gray-200 shadow-lg'}`}
                                    style={{ boxShadow: theme === 'dark' ? `0 10px 40px -10px ${item.color}30` : `0 10px 30px -10px ${item.color}20` }}>

                                    <span className="text-sm font-mono tracking-widest uppercase font-bold mb-3 block" style={{ color: item.color }}>
                                        Step {item.id}
                                    </span>

                                    <h4 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h4>
                                    <p className={`text-base mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {item.desc}
                                    </p>

                                    <div className="flex flex-wrap gap-2 text-sm font-mono">
                                        {item.tags.map(tag => (
                                            <span key={tag} className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-900 border border-gray-800 text-gray-300' : 'bg-gray-50 border border-gray-200 text-gray-600'}`}>
                                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: item.color }}></span>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* NEW: End of Pipeline Marker */}
            <div className="relative mt-24 flex justify-center z-10">
                <div className={`px-8 py-4 rounded-full border-2 flex items-center gap-3 transition-all duration-500 shadow-[0_0_30px_rgba(255,69,0,0.2)] ${scrollProgress > 0.95 ? 'scale-100 opacity-100' : 'scale-95 opacity-50'} ${theme === 'dark' ? 'bg-[#0a0a0c] border-[#FF4500] text-white' : 'bg-white border-[#FF4500] text-gray-900'}`}>
                    <div className="w-3 h-3 rounded-full bg-[#FF4500] animate-ping"></div>
                    <span className="font-bold tracking-wide uppercase text-sm font-mono text-[#FF4500]">
                        Live Intelligence Active
                    </span>
                </div>
            </div>

        </div>
    );
}