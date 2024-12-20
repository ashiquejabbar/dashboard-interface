import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTemplates } from '@/Context/TemplateContext';
import { validateTemplate } from '@/components/validateTemplate';
import { Layout } from '@/Layout/Layout';
import { MAX_TEMPLATE_NAME_LENGTH, MAX_HEADER_LENGTH, MAX_BODY_LENGTH, MAX_FOOTER_LENGTH, MAX_BUTTON_TEXT_LENGTH } from '@/components/constants';

export function CreateTemplate() {
    const navigate = useNavigate();
    const { addTemplate } = useTemplates();
    const { toast } = useToast();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        name: '',
        header: '',
        body: '',
        footer: '',
        buttonText: '',
        buttonUrl: '',
    });

    const handleChange = (field: keyof typeof formData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const template = {
            id: crypto.randomUUID(),
            name: formData.name,
            category: 'MARKETING' as const,
            status: 'PENDING' as const,
            createdAt: new Date().toISOString(),
            sections: {
                header: { text: formData.header },
                body: { text: formData.body },
                footer: { text: formData.footer },
                buttons: formData.buttonText ? [
                    {
                        type: 'URL' as const,
                        text: formData.buttonText,
                        url: formData.buttonUrl,
                    },
                ] : [],
            },
        };

        const { isValid, errors: validationErrors } = validateTemplate(template);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        addTemplate(template);
        toast({
            title: 'Success',
            description: 'Template submitted for approval',
        });
        navigate('/templates');
    };
    const PreviewTemplate = () => (
        <div className="border rounded-lg p-4 bg-[#f0f2f5]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    <h2 className="text-sm font-medium text-gray-700">Template Preview</h2>
                </div>
            </div>

            {/* WhatsApp Frame */}
            <div className="max-w-sm mx-auto border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-[#008069] text-white px-4 py-2 flex items-center gap-3">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium">Message Preview</span>
                </div>

                {/* Chat */}
                <div className="bg-[#efeae2] p-4 min-h-[400px]">
                    <div className="bg-white rounded-lg p-3 max-w-[85%] ml-auto shadow-sm">
                        {/* Business Header */}
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white text-sm font-medium">
                                {formData.name.slice(0, 2).toUpperCase() || 'WA'}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-[#008069]">{formData.name || 'Business Name'}</div>
                                <div className="text-[11px] text-gray-500">Verified Business</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2 text-[13.5px]">
                            {formData.header && (
                                <div className="font-medium">{formData.header}</div>
                            )}
                            {formData.body && (
                                <div className="text-gray-700">{formData.body}</div>
                            )}
                            {formData.footer && (
                                <div className="text-gray-500 text-xs pt-1 border-t">{formData.footer}</div>
                            )}
                            {formData.buttonText && formData.buttonUrl && (
                                <div className="pt-2 space-y-1.5">
                                    <button className="w-full px-3 py-1.5 bg-[#008069] text-white text-sm rounded-full hover:bg-[#006e5a] transition-colors">
                                        {"Open link"}
                                    </button>
                                    <div className="flex justify-center items-center gap-1.5 px-2 py-1 bg-gray-50 rounded text-xs">
                                        <span className="truncate text-gray-600">{"Copy link"}</span>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(formData.buttonUrl);
                                                toast({ description: "URL copied" });
                                            }}
                                            className="text-[#008069] hover:text-[#006e5a] p-1"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Time */}
                        <div className="flex justify-end items-center gap-1 mt-1 text-[11px] text-gray-500">
                            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/templates')}
                        className="p-2"
                    >
                        ←
                    </Button>
                    <h1 className="text-2xl font-bold">Create Template</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <form noValidate onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block mb-2 font-medium">Template Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={handleChange('name')}
                                    maxLength={MAX_TEMPLATE_NAME_LENGTH}
                                    error={errors.name}
                                    placeholder="Enter template name"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                <p className="text-sm text-gray-500 mt-1">
                                    {formData.name.length}/{MAX_TEMPLATE_NAME_LENGTH}
                                </p>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Header Text</label>
                                <Input
                                    value={formData.header}
                                    onChange={handleChange('header')}
                                    maxLength={MAX_HEADER_LENGTH}
                                    //@ts-ignore
                                    error={errors.header}
                                    placeholder="Enter header text"
                                    required
                                />
                                {errors.header && <p className="text-red-500 text-sm mt-1">{errors.header}</p>}
                                <p className="text-sm text-gray-500 mt-1">
                                    {formData.header.length}/{MAX_HEADER_LENGTH}
                                </p>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Body</label>
                                <Textarea
                                    value={formData.body}
                                    onChange={handleChange('body')}
                                    maxLength={MAX_BODY_LENGTH}
                                    //@ts-ignore
                                    error={errors.body}
                                    placeholder="Enter message body"
                                    required
                                    className="min-h-[120px]"
                                />
                                {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
                                <p className="text-sm text-gray-500 mt-1">
                                    {formData.body.length}/{MAX_BODY_LENGTH}
                                </p>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Footer</label>
                                <Input
                                    value={formData.footer}
                                    onChange={handleChange('footer')}
                                    maxLength={MAX_FOOTER_LENGTH}
                                    //@ts-ignore
                                    error={errors.footer}
                                    placeholder="Enter footer text"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    {formData.footer.length}/{MAX_FOOTER_LENGTH}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2 font-medium">Button Text</label>
                                    <Input
                                        value={formData.buttonText}
                                        onChange={handleChange('buttonText')}
                                        //@ts-ignore
                                        maxLength={MAX_BUTTON_TEXT_LENGTH}
                                        error={errors.buttonText}
                                        placeholder="Enter button text"
                                    />
                                    {errors.buttonText && <p className="text-red-500 text-sm mt-1">{errors.buttonText}</p>}
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">Button URL</label>
                                    <Input
                                        type="url"
                                        value={formData.buttonUrl}
                                        onChange={handleChange('buttonUrl')}
                                        //@ts-ignore
                                        error={errors.buttonUrl}
                                        placeholder="https://example.com"
                                    />
                                    {errors.buttonUrl && <p className="text-red-500 text-sm mt-1">{errors.buttonUrl}</p>}
                                </div>
                            </div>

                            <div  className="flex gap-4 pt-4">
                                <Button className='border-gray-900 border' type="submit">Submit for Approval</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/templates')}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div>
                        <PreviewTemplate />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
